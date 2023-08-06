import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string;
  tasks: ITask[];
}

interface ITask {
  _id?: any;
  title: string;
  content: string;
  userId: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
  tasks: [
    {
      title: { type: String, required: true },
      content: { type: String },
      userId: { type: String },
      date: { type: Date, default: Date.now() },
    },
  ],
}, {
  timestamps: true,
});

// 3. Create a Model.
const UserSchema = model<IUser>('User', userSchema);

export default UserSchema;
