import { Request, Response, NextFunction } from 'express';
import { InvalidAccessToken } from '../auth-error';
import { verify } from 'jsonwebtoken';
import { TOKENS_CONFIG } from '@/config/tokens';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: new InvalidAccessToken() });
  }

  const [type, token] = authorization.split(' ');

  if (!type || !token) {
    return res.status(401).json({ error: new InvalidAccessToken() });
  }

  return verify(token, TOKENS_CONFIG.SECRET, (error, decoded) => {
    if (error || typeof decoded === 'string' || !decoded?.userId) {
      return res.status(401).json({ error: new InvalidAccessToken() });
    }

    res.locals.userId = decoded?.userId;

    return next();
  });
};
