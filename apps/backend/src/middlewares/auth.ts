import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../lib/db';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
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
    const subscription = await db().subscription.findFirst({
      where: {
        userId: Number((decoded as JwtPayload).id),
      },
    });

    req.user = {
      id: Number((decoded as JwtPayload).id),
      subscription,
    };

    next();
  } catch (e) {
    return next(new Error('Not authenticated'));
  }
}
