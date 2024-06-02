import express, { Router } from "express";
const router: Router = express.Router();

import { signin, signup } from "../controllers/UserControllers.js";

router.post("/signup", signup);
router.post("/signin", signin);

export default router;