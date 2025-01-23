import { ObjectId } from "mongoose";
import { Task } from "../models/task.model"
import { User } from "../models/user.model"
import { ITask } from "../utils/interfaces"
import { TaskStatus } from "../utils/enums";

export const create = async (task: ITask) => {
    try {
        const user = await User.findById(task.assignedTo);
        if (!user) throw new Error("Student not found");
        const newTask = await Task.create({
            title: task.title,
            description: task.description,
            status: task.status,
            dueTime: task.dueTime,
            assignedTo: task.assignedTo
        })
        await newTask.save();
        return newTask
    } catch (error) {
        throw error
    }
}

export const getTask = async (id: string) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("Student not found");
        const tasks = await Task.find({ assignedTo: id });
        return tasks;
    } catch (error) {
        throw error

    }
}

export const updateStatus = async (id: string, status: TaskStatus) => {
    try {
        if(!Object.values(TaskStatus).includes(status)){
            throw new Error("Invalid status value");
        }
        const task= await Task.findById(id);
        if(!task){
            throw new Error("Task not found");
        }
        task.status=status;
        await task.save();
        return task

    } catch (error) {
        throw error

    }
}