import { Request, Response, NextFunction } from 'express';
import { InvalidAccessToken } from '../auth-error';
import { verify } from 'jsonwebtoken';
import { APP_CONFIG } from '@/config/application';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: new InvalidAccessToken() });
  }

  const [type, token] = authorization.split(' ');

  if (!type || !token) {
    return res.status(401).json({ error: new InvalidAccessToken() });
  }

  return verify(token, APP_CONFIG.SECRET, (error) => {
    if (error) {
      return res.status(401).json({ error: new InvalidAccessToken() });
    }

    return next();
  });
};
