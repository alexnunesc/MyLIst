import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';

const UserRouter = Router();

UserRouter.post('/signup', (req: Request, res: Response) => UserController.signup(req, res));

export default UserRouter;
