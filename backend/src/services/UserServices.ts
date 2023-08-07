import funcToken from "../auth/authJwt";
import UserSchema from "../schemas/UserSchemas";

// imports externos.
import bcrypt from "bcryptjs";


export default class UserServices {
  static async signup(name: string, email: string, password: string) {
    // verificar se o usuário já existe.
    const userExiste = await UserSchema.findOne({ email });
    console.log(userExiste, 'user');
    
    
    if(userExiste) return {type: 'error', statusCode: 400, message: 'User already exists!'};
  
    // create token.
    const token = funcToken.createAuthJwt({ name, email });

    // criptografar a senha.
    const passwordHash = bcrypt.hashSync(password, 10);

    // criar o usuário.
    const user = await UserSchema.create({
      name,
      email,
      password: passwordHash,
    });

    // remover a senha do usuário.
    const { password: _, ...userWithoutPassword } = user.toObject();

    // retornar o token e a mensagem.
    return {type: 'success', statusCode: 201, message: 'Registrado com sucesso!', userWithoutPassword, token};
  }

}
