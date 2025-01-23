import bcrypt from "bcryptjs";
import { Request, response, Response } from "express";
import { create, login } from "../services/user.service";
import { sign } from "jsonwebtoken";
import config from "../config/config";



export const createStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, role, email, password, department, } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userPayload = {
            name,
            role,
            email,
            department: department ? department : '',
            password: hashedPassword
        }

        const user = await create(userPayload);

        return res.status(201).json({
            response: {
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email
                },
                success: true,
                message: "User created successfully",
            }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            response: {
                status: false,
                message: error.message || "Error creating student"
            }
        })
    }
};


export const userLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password);

        const jwtPayload = {
            id: user._id,
            name: user.name,
            role: user.role
        };
        const token = sign(jwtPayload, config.jwt_secret, { expiresIn: '72h' });

        return res.status(200).json({
            response: {
                status: true,
                message: "login successful",
                token
            }
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(400).json({
            response: {
                status: false,
                message: error.message || "An error occurred during login",
            },
        });
    }
}

