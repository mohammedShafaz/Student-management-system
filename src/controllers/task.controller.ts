import { Request, response, Response } from 'express'
import { create, getTask, updateStatus } from '../services/task.service';
import { CustomRequest } from '../utils/types';
import { isValidObjectId } from 'mongoose';

export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const newTask = await create(req.body);

        return res.status(201).json({
            response: {
                status: true,
                message: "Task assigned successfully",
                task: {
                    title: newTask.title,
                    description: newTask.description,
                    status: newTask.status,
                    dueTime: newTask.dueTime
                }
            }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            response: {
                status: false,
                error: error.message || "Error creating task"
            }
        })
    }
};

export const getTaskByStudent = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({
                response: {
                    status: false,
                    message: "Please login ",
                }
            });
        }

        const result = await getTask(id);

        if (result.length === 0) {
            return res.status(404).json({
                response: {
                    status: false,
                    message: "No task available for this student",
                }
            });
        }
        const tasks = result.map((item) => {
            return {
                id: item._id,
                title: item.title,
                description: item.description,
                status: item.status,
                dueTime: item.dueTime
            }
        })
        return res.status(200).json({
            response: {
                status: true,
                message: "tasks fetched successfully",
                tasks
            }
        })
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            response: {
                status: false,
                error: error.message || "Error fetching task list"
            }
        })
    }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        
        if (!isValidObjectId(taskId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Task ID format",
            });
        }

        if (!status) {
            return res.status(400).json({
                status: false,
                message: "Status is missing",
            });
        }
        const task = await updateStatus(taskId, status);
        return res.status(200).json({
            response: {
                status: true,
                message: 'Task status updated successfully',
                task: {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    dueTime: task.dueTime
                }
            }
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            status: false,
            error: error.message || "Error updating status"
        })
    }
}