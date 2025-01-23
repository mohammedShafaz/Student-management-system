import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
import { validateTask } from "../middlewares/validatorMiddleware";
import { createTask, getTaskByStudent, updateTaskStatus } from "../controllers/task.controller";
import { UserRoles } from "../utils/enums";

const taskRoute = Router();

taskRoute.post("/admin", authMiddleware, roleMiddleware([UserRoles.ADMIN]), validateTask, createTask);
taskRoute.get("/student", authMiddleware, roleMiddleware([UserRoles.STUDENT]), getTaskByStudent);
taskRoute.patch("/student/:taskId", authMiddleware, roleMiddleware([UserRoles.STUDENT]), updateTaskStatus)
export default taskRoute;