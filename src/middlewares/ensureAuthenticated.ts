import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AuthError from '../errors/AppError';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AuthError(
      'Ocorreu um erro com a autenticação. Favor logar novamente.',
      401,
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AuthError(
      'Ocorreu um erro com a autenticação. Favor logar novamente.',
      401,
    );
  }
}
