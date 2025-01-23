import { ObjectId } from "mongoose";
import { TaskStatus, UserRoles } from "./enums";

export interface IUser {
    name: string,
    role: UserRoles,
    email: string;
    department: string,
    password: string
}

export interface ITask {
    title: string,
    description: string,
    status: TaskStatus,
    dueTime: Date,
    assignedTo: ObjectId
}