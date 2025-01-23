import { Schema, model } from "mongoose";
import { IUser } from "../utils/interfaces";
import { UserRoles } from "../utils/enums";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: UserRoles,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const User = model('User', userSchema);