import { Request, Response, Router } from "express";
import userRoute from "./user.route";
import taskRoute from "./task.route";

const routes = Router();

routes.get('/', (req: Request, res: Response) => { res.send("Welcome to student management") });

routes.use("/user", userRoute);
routes.use("/task", taskRoute);
export default routes;