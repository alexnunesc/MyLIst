import { compareSync } from 'bcryptjs';
import funcToken from '../auth/authJwt';
import UserSchema from "../schemas/UserSchemas";
const { ObjectId } = require('mongodb');

export default class LoginServices {
  static async login(email: string, password: string) {
    // verify if user exists
    const user = await UserSchema.findOne({ email });
    console.log('vwvw', user);
    
    if (!user) {
      return {
        type: 'error',
        statusCode: 400,
        message: "User not found",
      };
    }
    
    const query = {_id: new ObjectId(user._id)}; // Convertendo o ObjectId
    // create token.
    const token = funcToken.createAuthJwt({_id: query._id, email });

    // verify password
    const passwordMatch = compareSync(password, user.password);

    if (!passwordMatch) {
      return {
        type: 'error',
        statusCode: 400,
        message: "Incorrect password",
      };
    }

    // remove password from user object
    const { password: _, ...userWithoutPassword } = user.toObject();

    console.log('userWithoutPassword', userWithoutPassword._id);
    

    return { type: 'success', statusCode: 200, message: 'Login success', data: userWithoutPassword, token };
  }

  static async logout(email: string) {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return {
        type: 'error',
        statusCode: 400,
        message: "User not found",
      };
    }

    return { type: 'success', statusCode: 200, message: 'Logout success' };
  }
}
