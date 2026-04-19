import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from '#middlewares/errorHandler.js';
import { notFoundHandler } from '#middlewares/notFoundHandler.js';
import { corsConfig } from '#configs/cors.js';
import v1Router from '#routes/v1/index.js';

export const initializeApp = () => {
    const app = express();
    // Config cors
    app.use(cors(corsConfig));

    // Cookie parser middleware
    app.use(cookieParser());
    // Body parser middleware
    app.use(express.json());

    // HTTP request logger middleware
    app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms'),
    ); // Log to console

    // Healthy check endpoint
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'OK',
            service: 'Udemy Clone API',
            timestamp: new Date().toISOString(),
        });
    });

    // Routes
    app.use('/api/v1', v1Router);
    // Error Handler
    app.use(errorHandler);
    app.use(notFoundHandler);
    return app;
};
