import { Request, Response, Router } from 'express';

import LoginController from '../controller/LoginController';

const LoginRouter = Router();

LoginRouter.post('/login', (req: Request, res: Response) => LoginController.login(req, res));
LoginRouter.post('/logout', (req: Request, res: Response) => LoginController.logout(req, res));

export default LoginRouter;
