import * as jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret';

export type UserTokenLogin = {
  _id: string;
  // name: string;
  email: string;
};

const createAuthJwt = (user: UserTokenLogin) => {
  const token = jwt.sign(
    {
      _id: user._id,
      // name: user.name,
      email: user.email
    }, JWT_SECRET,
    { expiresIn: '24h', algorithm: 'HS256',}
    );
  return token;
};

const verifyJwt = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as {[x: string]: any; email: string};
  return decoded;
};

export default {
  createAuthJwt,
  verifyJwt,
};
