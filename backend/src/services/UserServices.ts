import funcToken from "../auth/authJwt";
import UserSchema from "../schemas/UserSchemas";

// imports externos.
import bcrypt from "bcryptjs";


export default class UserServices {
  static async signup(id: string, name: string, email: string, password: string) {
    // verificar se o usuário já existe.
    const user = await UserSchema.findOne({ email });
    
    if(user) return {type: 'error', statusCode: 400, message: 'User already exists!'};
  
    // create token.
    const token = funcToken.createAuthJwt({ id, name, email });

    // criptografar a senha.
    const passwordHash = bcrypt.hashSync(password, 10);

    // criar o usuário.
    await UserSchema.create({
      name,
      email,
      password: passwordHash,
    });

    // retornar o token e a mensagem.
    return {type: 'success', statusCode: 201, message: 'Registrado com sucesso!', token};
  }

}
