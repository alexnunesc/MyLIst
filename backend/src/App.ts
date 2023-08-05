import cors from 'cors';
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import LoginRouter from './routes/LoginRouter';
import TaskRouter from './routes/TaskRouter';
import UserRouter from './routes/UserRouter';

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    App.db();
  }

  private static db() {
    mongoose
      .connect(process.env.MONGO_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)

  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors())
  }

  private routes() {
    this.app.use(UserRouter);
    
    this.app.use(LoginRouter);

    this.app.use(TaskRouter);

    //   // await UserSchema.updateOne({ _id: decoded.id }, {
    //   //   $push: {
    //   //     tasks: {
    //   //       title,
    //   //       completed,
    //   //       date
    //   //     }
    //   //   }
    //   // });

    //   user.tasks.push({
    //     title,
    //     completed,
    //     date
    //   });

    //   user.save();

    //   return response.status(201).json({ message: 'Task created' });
    // });

    // this.app.delete('/task/:id', tokenExist.handle, async(request: Request, response: Response) => {
    //   // const { title } = request.body;
    //   const { id } = request.params;
      
    //   const token = request.headers.authorization;

    //   const decoded = jwt.verify(token || '', process.env.JWT_SECRET as string) as unknown as { id: string };

    //   const user = await UserSchema.findById(decoded.id);

    //   if(!user) {
    //     return response.status(400).json({ message: 'User not found' });
    //   }

    //   await UserSchema.updateOne({ _id: decoded.id }, {
    //     $pull: {
    //       tasks: {
    //         _id: id
    //       }
    //     }
    //   });

    //   return response.status(201).json({ message: 'foi' });
    // });

    // this.app.put('/task/:id', tokenExist.handle, async(request: Request, response: Response) => {
    //   const { id } = request.params;
    //   const { title, completed, date } = request.body;

    //   const token = request.headers.authorization;

    //   const decoded = jwt.verify(token || '', process.env.JWT_SECRET as string) as unknown as { id: string };

    //   const user = await UserSchema.findById(decoded.id);

    //   if(!user) {
    //     return response.status(400).json({ message: 'User not found' });
    //   }

    //   await UserSchema.updateOne({ _id: decoded.id, 'tasks._id': id }, {
    //     $set: {
    //       'tasks.$.title': title,
    //       'tasks.$.completed': completed,
    //       'tasks.$.date': date
    //     }
    //   });

    //   return response.status(201).json({ message: 'foi' });
    // });

    // this.app.get('/list', async(request: Request, response: Response) => {
    //   const token = request.headers.authorization;

    //   const decoded = jwt.verify(token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWEyY2M3MWFiYWI1ODUxNWY2MGE3NiIsImlhdCI6MTY4ODg3NDIwNn0.pw_N1Q4dXZX07F_deNycM_eKoSNP3rYMFikjZkP-fp4', process.env.JWT_SECRET as string) as unknown as { id: string };

    //   const user = await UserSchema.findById(decoded.id);

    //   if(!user) {
    //     return response.status(400).json({ message: 'User not found' });
    //   }

    //   return response.status(200).json(user.tasks);
    // });
    
  }

}
