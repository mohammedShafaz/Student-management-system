import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { IUser } from "../utils/interfaces";


export const create = async (user: IUser) => {
    try {
        const existingEmail = await User.findOne({ email: user.email });
        if (existingEmail) {
            throw new Error("User with this email already existing")
        }
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password,
            department: user.department
        });
        newUser.save();
        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            throw new Error("Invalid  email");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("Incorrect password");
        }
        return user;
    } catch (error) {
        throw error;
    }
}