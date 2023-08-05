import funcToken from "../auth/authJwt";
import UserSchema from "../schemas/UserSchemas";

export default class TaskServices {
  static async createTask(title: string, content: string, token: string ) {

    const decoded = funcToken.verifyJwt(token);

    const user = await UserSchema.findOne({ email: decoded.email });

    if(!user) {
      return {type: 'error', statusCode: 400, message: 'User not found'};
    }

    user.tasks.push({ title, content, userId: user.id });
    user.save();

    return {type: 'success', statusCode: 201, message: 'Task created'};
  }

  // static async deleteTask(id: string, token: string) {
  //   const decoded = funcToken.verifyJwt(token);

  //   if(!decoded) {
  //     return {type: 'error', statusCode: 400, message: 'Token not found'};
  //   }

  //   const user = await UserSchema.findById(decoded.id);

  //   if(!user) {
  //     return {type: 'error', statusCode: 400, message: 'User not found'};
  //   }

  //   const task = user.tasks.find(task => task._id == id);

  //   if(!task) {
  //     return {type: 'error', statusCode: 400, message: 'Task not found'};
  //   }

  //   await UserSchema.updateOne({ _id: decoded.id }, {
  //     $pull: {
  //       tasks: {
  //         _id: id
  //       }
  //     }
  //   });

  //   return {type: 'success', statusCode: 200, message: 'Task deleted'};
  // }

  // static async updateTask(id: string, title: string, content: string, token: string, date: Date) {
  //   const decoded = funcToken.verifyJwt(token);

  //   if(!decoded) {
  //     return {type: 'error', statusCode: 400, message: 'Token not found'};
  //   }

  //   const user = await UserSchema.findById(decoded.id);

  //   if(!user) {
  //     return {type: 'error', statusCode: 400, message: 'User not found'};
  //   }

  //   const task = user.tasks.find(task => task._id == id);

  //   if(!task) {
  //     return {type: 'error', statusCode: 400, message: 'Task not found'};
  //   }

  //   await UserSchema.updateOne({ _id: decoded.id, 'tasks._id': id }, {
  //     $set: {
  //       'tasks.$.title': title,
  //       'tasks.$.content': content,
  //       'tasks.$.date': date
  //     }
  //   });

  //   return {type: 'success', statusCode: 200, message: 'Task updated'};
  // }

  static async getTasks(token: string) {
    const decoded = funcToken.verifyJwt(token);
  
    const user = await UserSchema.findOne({ email: decoded.email });

    if(!user) {
      return {type: 'error', statusCode: 400, message: 'User not found'};
    }

    return {type: 'success', statusCode: 200, data: user.tasks};
  }
}