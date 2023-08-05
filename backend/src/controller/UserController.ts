import { Request, Response } from 'express';
import UserServices from '../services/UserServices';

export default class UserController {
  static async signup(req: Request, res: Response) {
    const { id, name, email, password } = req.body;
    
    const { type, statusCode, message, token } = await UserServices.signup(id, name, email, password);

    if(type === 'error') return res.status(statusCode).json({ message });

    return res.status(201).json({ message: 'Registrado com sucesso!', token });
  }
}