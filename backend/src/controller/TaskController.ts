import { Request, Response } from "express";
import TaskServices from "../services/TaskServices";

export default class TaskController {
  static async createTask(req: Request, res: Response) {
    const { title, content } = req.body;

    const token  = req.headers.authorization;
    if(!token) {
      return res.status(400).json({ message: 'Token not found' });
    }

    const { type, statusCode, message } = await TaskServices.createTask(title, content, token);

    if(type === 'error') {
      return res.status(statusCode).json(message);
    }
    return res.status(statusCode).json(message);
  }

  static async deleteTask(req: Request, res: Response) {
    const { id } = req.params;  

    const token  = req.headers.authorization;
    console.log('token', token);
    
    if(!token) {
      return res.status(400).json({ message: 'Token not found' });
    }

    const { type, statusCode, message } = await TaskServices.deleteTask(id, token);

    return res.status(statusCode).json(message);
  }

  static async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const token  = req.headers.authorization;
    if(!token) {
      return res.status(400).json({ message: 'Token not found' });
    }
    
    const { type, statusCode, message } = await TaskServices.updateTask(id, title, content, token);

    return res.status(statusCode).json(message);
  }

  static async getTasks(req: Request, res: Response) {
    const token  = req.headers.authorization;

    const { type, statusCode, message, data } = await TaskServices.getTasks(token as string);
    
    if(type === 'error') {
      return res.status(statusCode).json(message);
    }
    return res.status(statusCode).json(data);
  }
}
