import { Request, Response, text } from "express";
import crypto from "crypto";
import Otp from "../models/OtpModel.js";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "contactashar4@gmail.com",
    pass: "hamzarotH01+",
  },
});

const mailOptions = {
  from: "contactashar4@gmail.com",
  to: "asharkhan7658@gmail.com",
  subject: "OTP for verification",
  text: "This is a test mail send from node backend using nodemailer",
}

export const generateOtp = async (req: Request, res:Response) => {
  console.log("generateOt");
    try {
        const { userId } = req.body;
        const otp: string = crypto.randomInt(100000, 999999).toString();
        const expiresAt: Date = new Date(Date.now() + 5 * 60 * 1000);  // 5 minutes from now

        // Save OTP to the database
        const newOTP = new Otp({ userId, otp, expiresAt });
        await newOTP.save();

        // Send OTP to the user (replace with your actual service)
        // await sendOTPService.sendOTP(userId, otp);
        transporter.sendMail(mailOptions, (error, info) => {
          if(error){
            console.log(error);
            return res.status(500).json({ error: 'Failed to send OTP'});
          } else {
            return res.status(200).json({ message: 'OTP generated and sent successfully', info });
          }
        })
        res.status(200).json({ message: 'OTP generated and sent successfully', otp, expiresAt });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
};

export const verifyOtp = async (req: Request, res:Response) => {
    try {
        const { userId, otp } = req.body;
    
        // Find the OTP in the database
        const otpRecord = await Otp.findOne({ userId });
    
        if (!otpRecord) {
          return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        // Check if the OTP is valid and not expired
        const isValid = otpRecord.otp === otp && otpRecord.expiresAt > new Date();
    
        if (isValid) {
          // OTP is valid, perform the desired action (e.g., grant access)
          res.status(200).json({ message: 'OTP verified successfully' });
        } else {
          res.status(400).json({ error: 'Invalid or expired OTP' });
        }
    
        // Delete the OTP record after verification
        await Otp.deleteOne({ _id: otpRecord._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }    
}