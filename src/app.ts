import express, { Express, Request, Response } from 'express';
import routes from './routes';
import { BASE_PATH } from './utils/constants';
import config from './config/config';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';

export class App {

    private app: Express;
    private port: number;
    private server: http.Server;
    
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = this.getPort();
        this.setupMiddleware();
        this.setupDatabase();
        this.setupRoutes();
    }

    private getPort(): number {
        const port = parseInt(config.port.toString(), 10);
        if (isNaN(port)) {
            throw new Error(`Invalid PORT value: ${port}`)
        }
        return port;
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: '*',
        }))
    }

    private setupDatabase(): void {
        mongoose.connect(config.db, {
            maxPoolSize: 10
        }).then(() => {
            console.log("Database connected successfully...")
        }).catch(err => console.error('Error connecting to MongoDB', err));
    }
    private setupRoutes(): void {
        this.app.use(BASE_PATH, routes);

    }


    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}${BASE_PATH}`);
        })
    }
}