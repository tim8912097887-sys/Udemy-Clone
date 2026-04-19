import { BaseController } from '#base-classes/controller.js';
import { IAuthController } from '#base-interfaces/controller.js';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './service.js';
import { clearCookie, createCookieOptions, sendCookie } from '#utils/cookie.js';
import { createToken } from '#utils/token.js';
import { env } from '#configs/env.js';
import { toMessageResponse, toUserResponse } from './presenter.js';

export class AuthController extends BaseController implements IAuthController {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async signup(req: Request, res: Response, _next: NextFunction) {
        await this.authService.signup(req.body);
        const data = toMessageResponse('Signup successfully');
        const successResponse = { res, data, statusCode: 201 };
        this.ok(successResponse);
    }

    async login(req: Request, res: Response, _next: NextFunction) {
        const user = await this.authService.login(req.body);
        const payload = { sub: user._id.toString() };
        const accessToken = await createToken(
            payload,
            env.ACCESS_TOKEN_SECRET,
            env.ACCESS_TOKEN_EXPIRES_IN,
        );
        const refreshToken = await createToken(
            payload,
            env.REFRESH_TOKEN_SECRET,
            env.REFRESH_TOKEN_EXPIRES_IN,
        );
        const cookieOptions = createCookieOptions({
            maxAge: 24 * 60 * 60 * 1000 * 7,
        });

        sendCookie(res, 'refresh_token', refreshToken, cookieOptions);
        sendCookie(res, 'access_token', accessToken, cookieOptions);
        const data = toUserResponse({
            user,
            message: 'Login successfully',
        });
        const successResponse = { res, data };
        this.ok(successResponse);
    }

    async refresh(req: Request, res: Response, _next: NextFunction) {
        const user = await this.authService.refresh(req.user.sub);
        const payload = { sub: user._id.toString() };
        const accessToken = await createToken(
            payload,
            env.ACCESS_TOKEN_SECRET,
            env.ACCESS_TOKEN_EXPIRES_IN,
        );
        // Refresh token rotation
        const refreshToken = await createToken(
            payload,
            env.REFRESH_TOKEN_SECRET,
            env.REFRESH_TOKEN_EXPIRES_IN,
        );
        const cookieOptions = createCookieOptions({
            maxAge: 24 * 60 * 60 * 1000 * 7,
        });

        sendCookie(res, 'refresh_token', refreshToken, cookieOptions);
        sendCookie(res, 'access_token', accessToken, cookieOptions);
        const data = toMessageResponse('Refresh successfully');
        const successResponse = { res, data };
        this.ok(successResponse);
    }
    async logout(_req: Request, res: Response, _next: NextFunction) {
        // Clear cookies
        clearCookie(res, 'refresh_token');
        clearCookie(res, 'access_token');
        const data = toMessageResponse('Logout successfully');
        const successResponse = { res, data };
        this.ok(successResponse);
    }
}
