import { CorsOptions } from 'cors';
import { Request } from 'express';

const protectedRoutes = ['/api/v1/auth'];

const allowedOrigins = ['http://localhost:5173'];
export const corsConfig = (req: Request, callback: any) => {
    const isProtectedRoute = protectedRoutes.some((route) =>
        req.url.startsWith(route),
    );

    const corsOptions: Partial<CorsOptions> = {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    };
    if (isProtectedRoute) {
        corsOptions.credentials = true;
        corsOptions.origin = allowedOrigins;
        callback(null, corsOptions);
    } else {
        callback(null, corsOptions);
    }
};
