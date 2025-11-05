import { redisClient } from "clients/redisClient";
import { NextFunction, Request, Response } from "express";
import { Auth } from "modules/auth/auth";
import { UserRepository } from "repositories/userRepository";
import { env } from "shared/env/env";
import { AppError } from "shared/error/appError";


interface ITokenPayload {
  sub: string;
  exp: number;
}

export async function shouldAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Faça o login e tente novamente!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await Auth.validateToken(token, request);
    const { sub, exp } = decoded as unknown as ITokenPayload;
    const userId = sub;

    const expiresAt = exp ? new Date(exp * 1000) : null;

    if ((expiresAt !== null && expiresAt < new Date())) {
      throw new AppError('Por gentileza, faça login para continuar!', 401);
    }

    const cachedUser = await redisClient.get(`user:${userId}`);

    let userName: string;
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      userName = user.name;
    } else {
      const user = await UserRepository.findById(userId);
      if (!user) throw new AppError('JWT inválido', 401);

      userName = user.name;

      await redisClient.setEx(`user:${userId}`, env.REDIS_EXPIRE_TIME, JSON.stringify({ id: userId, name: userName, roleId: user.roleId, email: user.email }));
    }

    request.user = { id: userId, name: userName };

    return next();
  } catch (err: any) {
    if (err instanceof AppError) throw err;
    throw new AppError('Ocorreu um erro na autenticação, tente novamente!', 401);
  }
}
