import { JwtPayload } from "jsonwebtoken";
import { Auth } from "modules/auth/auth";
import { AuthDTO } from "modules/auth/dto/auth";
import { AppError } from "shared/error/appError";
import jwt from 'jsonwebtoken'
import { env } from "shared/env/env";


export class LoginServices {
  static async login(login: string, secret: string): Promise<AuthDTO> {
    if (!login || !secret) throw new AppError('Usuário ou senha inválidos', 401);

    // const user = await UserRepository.findByLogin(email);

    // if (!user) throw new AppError('Usuário ou senha inválidos', 401);

    const user = {
        secret: '$2a$12$kmSnzRtbWDzoLK.ZfyW1rOxfBw7wmcyvHoWLLXAp35piSmO212VY6',
        id: '5d842875-33f6-4dfa-b67a-9e5b25708f28', 
        name: 'João', 
        email: "aaaddasdasdas@t.co",
        phone: "9777777777",
        roleId: 1
    }

    const validPassword = await Auth.validatePassword(user.secret, secret);

    if (!validPassword) {
      throw new AppError('A senha informada não é válida.', 401);
    }

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

    // const user = await UserRepository.findById(decoded.sub);
    // if (!user) throw new AppError('Usuário não encontrado', 404);

    const user = {
        secret: '$2a$12$kmSnzRtbWDzoLK.ZfyW1rOxfBw7wmcyvHoWLLXAp35piSmO212VY6',
        id: '5d842875-33f6-4dfa-b67a-9e5b25708f28', 
        name: 'João', 
        email: "aaaddasdasdas@t.co",
        phone: "9777777777",
        roleId: 1
    }

    const auth = await Auth.generateToken(user);

    return { ...auth, refreshToken };
  }

  // static async logout(id: string): Promise<boolean> {}
}
