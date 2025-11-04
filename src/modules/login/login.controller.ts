import { Request, Response } from 'express';
import { LoginServices } from './login.service';
import { AppError } from 'shared/error/appError';

export class LoginController {
    static async login(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body;

        const auth = await LoginServices.login(email, password);

        const { refreshToken: _, ...rest } = auth;

        response.cookie('refreshToken', auth.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        response.status(200).send(rest);
    }

    static async refreshToken(request: Request, response: Response): Promise<void> {
        const cookies = request.headers.cookie;

        if (!cookies) {
            throw new AppError('Cookies não encontrados!');
        }

        const auth = await LoginServices.refresh(cookies);

        const { refreshToken: _, maxAge, ...restAuth } = auth;

        // corrigir o maxage
        response.cookie('refreshToken', auth.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        response.status(200).send(restAuth);
    }

    static async logout(request: Request, response: Response): Promise<void> {}
};
