import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new Error('Not authenticated'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new Error('Not authenticated'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    req.user = {
      id: (decoded as JwtPayload).id,
    };
    next();
  } catch (e) {
    return next(new Error('Not authenticated'));
  }
}
