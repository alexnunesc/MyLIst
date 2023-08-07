import funcToken from "../auth/authJwt";
import UserSchema from "../schemas/UserSchemas";

// imports externos.
import bcrypt from "bcryptjs";
const { ObjectId } = require('mongodb');


export default class UserServices {
  static async signup(name: string, email: string, password: string) {
    // verificar se o usuário já existe por meio do email e senha.
    // const userExiste =  

    // const userExiste = await UserSchema.findOne({ email });
    // console.log(userExiste, 'user');

    const userExiste = await UserSchema.findOne({ email });
    console.log('2222', userExiste);    
    
    if(userExiste) return {type: 'error', statusCode: 400, message: 'User already exists!'};
  
    // // create token.
    // const token = funcToken.createAuthJwt({_id: userExiste._id, name, email });

    // criptografar a senha.
    const passwordHash = bcrypt.hashSync(password, 10);

    // criar o usuário.
    const user = await UserSchema.create({
      name,
      email,
      password: passwordHash,
    });

    const query = {_id: new ObjectId(user._id)}; // Convertendo o ObjectId
    console.log('query', query);
    
    // create token.
    const token = funcToken.createAuthJwt({_id: query._id, email });

    // remover a senha do usuário.
    const { password: _, ...userWithoutPassword } = user.toObject();

    // retornar o token e a mensagem.
    return {type: 'success', statusCode: 201, message: 'Registrado com sucesso!', userWithoutPassword, token};
  }

}
