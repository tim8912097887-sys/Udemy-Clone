import { env } from '#configs/env.js';
import { UnauthorizedError } from '#errors/unauthorized.js';
import { verifyToken } from '#utils/token.js';
import { RequestHandler } from 'express';

export const checkRefreshToken: RequestHandler = async (req, _res, next) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        throw new UnauthorizedError('No refresh token found in cookies');
    }
    const decode = await verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET);
    if (!decode) {
        throw new UnauthorizedError('Invalid refresh token');
    }
    req.user = decode;
    next();
};
