import funcToken from "../auth/authJwt";
import UserSchema from "../schemas/UserSchemas";
const { ObjectId } = require('mongodb');

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

  static async deleteTask(id: string, token: string) {
    const decoded = funcToken.verifyJwt(token);
  
    if(!decoded) {
      return {type: 'error', statusCode: 400, message: 'Token not found'};
    }

    const user = await UserSchema.findById(decoded._id);

    if(!user) {
      return {type: 'error', statusCode: 400, message: 'User not found'};
    }

    // const query = { _id: new ObjectId(id) }; // Convertendo o ObjectId

    // const task = user.tasks.find((task) => task._id === query);

    const task = await UserSchema.updateOne({ _id: decoded._id }, {
      $pull: {
        tasks: {
          _id: id
        }
      }
    });

    // if(!task.upsertedId) {
    //   return {type: 'error', statusCode: 400, message: 'Task not found'};
    // }

    return {type: 'success', statusCode: 200, message: 'Task deleted'};
  }

  static async updateTask(id: string, title: string, content: string, token: string ) {
    const decoded = funcToken.verifyJwt(token);

    if(!decoded) {
      return {type: 'error', statusCode: 400, message: 'Token not found'};
    }

    const user = await UserSchema.findById(decoded._id);

    if(!user) {
      return {type: 'error', statusCode: 400, message: 'User not found'};
    }

    const query = { _id: new ObjectId(id) }; // Convertendo o ObjectId
    const task = user.tasks.find((t) => t._id.equals(query._id)); // Verifficando se o id da task é igual ao id da query

    if(!task) {
      return {type: 'error', statusCode: 400, message: 'Task not found'};
    }

    await UserSchema.updateOne({ _id: decoded._id, 'tasks._id': id }, {
      $set: {
        'tasks.$.title': title,
        'tasks.$.content': content,
        'tasks.$.date': Date.now()
      }
    });

    return {type: 'success', statusCode: 200, message: 'Task updated'};
  }

  static async getTasks(token: string) {
    const decoded = funcToken.verifyJwt(token);
  
    const user = await UserSchema.findOne({ email: decoded.email });

    if(!user) {
      return {type: 'error', statusCode: 400, message: 'User not found'};
    }

    return {type: 'success', statusCode: 200, data: user.tasks};
  }
}
