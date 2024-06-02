import express, { Router } from "express";
import { generateOtp, verifyOtp } from "../controllers/OtpControllers.js";
const router: Router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);

export default router;