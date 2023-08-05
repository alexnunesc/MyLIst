import { compareSync } from 'bcryptjs';
import funcToken from '../auth/authJwt';
import UserSchema from "../schemas/UserSchemas";

export default class LoginServices {
  static async login(email: string, password: string) {
    // verify if user exists
    const user = await UserSchema.findOne({ email });
    
    if (!user) {
      return {
        type: 'error',
        statusCode: 400,
        message: "User not found",
      };
    }
    
    // create token.
    const token = funcToken.createAuthJwt({ id: user.id, name: user.name, email });

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
