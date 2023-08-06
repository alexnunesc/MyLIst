import { Request, Response, Router } from 'express';
import TaskCOntroller from '../controller/TaskController';
import validationToken from '../middlewares/validateToken';

const TaskRouter = Router();

TaskRouter.post('/addtask', validationToken, (req: Request, res: Response) => TaskCOntroller.createTask(req, res));
TaskRouter.delete('/deletetask/:id', (req: Request, res: Response) => TaskCOntroller.deleteTask(req, res));
// TaskRouter.put('/task/:id', (req: Request, res: Response) => TaskCOntroller.updateTask(req, res));
TaskRouter.get('/tasks',validationToken, (req: Request, res: Response) => TaskCOntroller.getTasks(req, res));


export default TaskRouter;
