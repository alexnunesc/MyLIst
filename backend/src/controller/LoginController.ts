import { Request, Response } from "express";
import LoginServices from '../services/LoginServices';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token, type, statusCode, data, message } = await LoginServices.login(email, password);

    if (type === 'error') return res.status(statusCode).json({ type, message });

    res.status(statusCode).json({ token, type, data, message });
  }

  static async logout(req: Request, res: Response) {
    const { email } = req.body;
    const { type, statusCode, message } = await LoginServices.logout(email);

    if (type === 'error') return res.status(statusCode).json({ type, message });

    res.status(statusCode).json(message);
  }

}
