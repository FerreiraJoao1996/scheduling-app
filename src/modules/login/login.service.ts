import { JwtPayload } from "jsonwebtoken";
import { Auth } from "modules/auth/auth";
import { AuthDTO } from "modules/auth/dto/auth";
import { AppError } from "shared/error/appError";
import jwt from 'jsonwebtoken'
import { env } from "shared/env/env";
import { UserRepository } from "repositories/userRepository";
import { redisClient } from "clients/redisClient";
import { CacheService } from "shared/utils/cacheService";


export class LoginServices {
  static async login(email: string, password: string): Promise<AuthDTO> {
    if (!email || !password) throw new AppError('Usuário ou senha inválidos', 401);

    const user = await UserRepository.findByEmail(email);

    if (!user) throw new AppError('Usuário não encontrado', 401);

    const validPassword = await Auth.validatePassword(user.password, password);

    if (!validPassword) {
      throw new AppError('A senha informada não é válida.', 401);
    }

    await redisClient.setEx(`user:${user.id}`, env.REDIS_EXPIRE_TIME, JSON.stringify({ id: user.id, name: user.name, roleId: user.roleId }));

    return await Auth.generateToken(user);
  }

  static async refresh(cookiesHeader: string): Promise<AuthDTO> {
    const cookies = Object.fromEntries(
      cookiesHeader.split(';').map(cookie => {
        const [name, ...rest] = cookie.trim().split('=');
        return [name, rest.join('=')];
      }),
    );

    const refreshToken = cookies.refreshToken;

    const decoded: JwtPayload = jwt.verify(refreshToken, env.JWT_SECRET) as JwtPayload;

    if (decoded.exp) {
      throw new AppError('Refresh token inválido ou expirado, faça o login novamente!', 401);
    }

    const user = await UserRepository.findById(decoded.sub as string);
    if (!user) throw new AppError('Usuário não encontrado', 404);

    const auth = await Auth.generateToken(user);

    return { ...auth, refreshToken };
  }

  static async logout(id: string): Promise<void> {
    return await CacheService.del(`user:${id}`);

  }
}
