import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../utils/types';
import config from '../config/config';

//Simplified token authentication using JWT
const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
         res.status(401).json({ message: 'Unauthorized !, Please login' });
         return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
         res.status(401).json({ message: "Invalid or expired token" });
         return;
    }
    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
         res.status(403).json({ message: 'Forbidden' });
         return;
    }
};


export default authMiddleware;