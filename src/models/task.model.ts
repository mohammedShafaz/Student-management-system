import { Schema, model, Document } from "mongoose";
import { ITask } from "../utils/interfaces";
import { TaskStatus } from "../utils/enums";

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: TaskStatus,
        required: true,
        default:TaskStatus.PENDING
    },
    dueTime: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Task = model('Task', taskSchema);