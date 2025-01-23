import { Router } from "express";
import { createStudent, userLogin } from "../controllers/user.controller";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";
import { validateUserRegistration } from "../middlewares/validatorMiddleware";

const userRoute= Router();

userRoute.post('/admin/add-student',authMiddleware,roleMiddleware(["ADMIN"]),validateUserRegistration,createStudent);
userRoute.post("/login",userLogin);


export default userRoute;