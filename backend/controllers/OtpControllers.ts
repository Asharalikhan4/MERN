import { Request, Response } from "express";

export const generateOtp = async (req: Request, res:Response) => {
    res.status(200).json({ message: "OTP generated successfully" });
};