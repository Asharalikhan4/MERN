import express from "express";
import { generateOtp } from "../controllers/OtpControllers.js";
const router = express.Router();
router.get("/generate-otp", generateOtp);
export default router;
