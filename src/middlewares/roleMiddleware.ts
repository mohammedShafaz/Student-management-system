import { NextFunction, Response } from "express"
import { CustomRequest } from "../utils/types"

// Simplified RBAC implimentaion
const roleMiddleware = (allowedRoles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user || !user.role) {
             res.status(401).json({ message: 'Unauthorized! Role missing.' });
             return
        }
        if (!allowedRoles.includes(user.role)) {
             res.status(403).json({ message: 'Forbidden! You do not have access to this resource.' });
             return;
        }
        next();
    };
};

export default roleMiddleware;