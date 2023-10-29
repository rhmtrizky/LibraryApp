import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const Authenticate = (req: Request, res: Response, next: NextFunction): Response => {
  const authorizationHeader = req.headers.authorization;

  // console.log(authorizationHeader.startsWith("Bearer"))

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res.status(400).json({
      error: 'Unauthorized',
    });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const loginSession = jwt.verify(token, 'rhmtrizky123');
    // console.log("ini bagian login session", loginSession)
    res.locals.loginSession = loginSession;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'wrong token' });
  }
};

export default Authenticate;
