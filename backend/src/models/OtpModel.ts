import mongoose, { Schema, Document } from "mongoose";

interface OtpDocument extends Document {
    userId: string;
    otp: string;
    expiresAt: Date;
  }

const OtpSchema: Schema = new mongoose.Schema<OtpDocument>({
    userId: { 
        type: String,
        required: true 
    },
    otp: { 
        type: String, 
        required: true 
    },
    expiresAt: { 
        type: Date, 
        equired: true 
    },
});

const Otp = mongoose.model<OtpDocument>("Otp", OtpSchema);

export default Otp;