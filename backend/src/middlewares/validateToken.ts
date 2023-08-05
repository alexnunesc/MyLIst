import { NextFunction, Request, Response } from 'express';
import funcToken from '../auth/authJwt';

const validationToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    funcToken.verifyJwt(token);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validationToken;
