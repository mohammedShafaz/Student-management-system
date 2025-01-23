import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}


export const validateUserRegistration = [
    body('name').notEmpty().withMessage('name is required'),
    body('role').notEmpty().withMessage('user role is required'),
    body('email').isEmail().withMessage('Invalid Email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    validate
]
export const validateUserLogin = [
    body('email').notEmpty().isEmail().withMessage('Invalid Email address'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    validate
]
export const validateTask = [
    body('title').notEmpty().withMessage('title is required'),
    body('status').notEmpty().withMessage('status is required'),
    body('dueTime').notEmpty().withMessage('dueTime is required'),
    body('assignedTo').notEmpty().withMessage('assignedTo is required'),
    validate
]