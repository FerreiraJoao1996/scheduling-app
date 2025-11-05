import { AuthDTO } from "modules/auth/dto/auth";
import { UserDTO } from "modules/users/dto/user";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { env } from "shared/env/env";
import { AppError } from "shared/error/appError";
import { Request } from "express";
import bcrypt from 'bcrypt';

export class Auth {
    static async generateToken(user: UserDTO): Promise<AuthDTO> {
        const accessToken = jwt.sign({ id: user.id }, env.JWT_SECRET, {
            subject: String(user.id),
            expiresIn: env.JWT_ACCESS_EXPIRATION_TIME as never,
        });

        const refreshToken = jwt.sign({ id: user.id }, env.JWT_SECRET, {
            subject: String(user.id),
            expiresIn: env.JWT_REFRESH_EXPIRATION_TIME as never,
        });

        return {
            id: user.id,
            roleId: user.roleId,
            accessToken: `Bearer ${accessToken}`,
            refreshToken,
        };
    }

    static async validateToken(token: string, request: Request): Promise<JwtPayload> {
        if (!token) throw new AppError('O Token de acesso é obrigatório', 401);
        try {
            const decoded: JwtPayload = jwt.verify(token.replace('Bearer ', ''), env.JWT_SECRET) as JwtPayload;

            request.user = {
                id: decoded.id,
            };

            return decoded;
        } catch (ex: any) {
            if (ex.message === 'jwt expired') throw new AppError('Token de acesso expirado', 401);

            throw new AppError('Token de acesso inválido', 401);
        }
    }

    static async validatePassword(currentPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, currentPassword);
    }
}