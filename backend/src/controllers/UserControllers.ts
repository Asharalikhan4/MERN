import { Request, Response } from "express";
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from "../config/config.js";
import SaveToken from "../utils/SaveToken.js";
import GenerateToken from "../utils/GenerateToken.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name  } = req.body;
        const userExists: boolean | null = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        };
        const hashedPassword: string = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name
        });
        await user.save();
        return res.status(201).json({ message: 'User created successfully', User: user });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create user', Error: error });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userExists: boolean | any = await User.findOne({ email });
        if(!userExists) {
            return res.status(400).json({ error: 'Invalid User' });
        };
        const isPasswordValid: boolean = await bcrypt.compare(password, userExists?.password);
        if(!isPasswordValid){
            return res.status(400).json({ error: 'Invalid Credentials' });
        }
        const token: string = GenerateToken(userExists._id, userExists.email);
        await SaveToken(userExists._id, token);
        return res.status(200).json({ message: 'User signed in successfully', user: userExists });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to sign in', Error: error });
    }
}