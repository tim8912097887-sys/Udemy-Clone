import { logger } from '#configs/logger.js';
import { Router } from 'express';
import { AuthController } from './controller.js';
import { AuthService } from './service.js';
import { AuthRepository } from './repository.js';
import { AuthRoute } from './route.js';

class AuthContainer {
    private static instance: AuthContainer | null = null;
    private readonly logger = logger;
    private router: Router | null = null;
    private authController: AuthController | null = null;
    private authService: AuthService | null = null;
    private authRepository: AuthRepository | null = null;

    private constructor() {}

    public static getInstance(): AuthContainer {
        if (!AuthContainer.instance) {
            AuthContainer.instance = new AuthContainer();
        }
        return AuthContainer.instance;
    }

    public getRouter(): Router {
        if (!this.router) {
            this.logger.debug('AuthContainer: Creating AuthRoute');
            this.authController = this.getController();
            this.router = new AuthRoute(this.authController).getRouter();
        }
        return this.router;
    }

    public getController() {
        if (!this.authController) {
            this.logger.debug('AuthContainer: Creating AuthController');
            this.authService = this.getService();
            this.authController = new AuthController(this.authService);
        }
        return this.authController;
    }

    public getService() {
        if (!this.authService) {
            this.logger.debug('AuthContainer: Creating AuthService');
            this.authRepository = this.getRepository();
            this.authService = new AuthService(this.authRepository);
        }
        return this.authService;
    }

    public getRepository() {
        if (!this.authRepository) {
            this.logger.debug('AuthContainer: Creating AuthRepository');
            this.authRepository = new AuthRepository();
        }
        return this.authRepository;
    }

    public reset() {
        logger.debug('AuthContainer: Resetting all dependencies');
        this.router = null;
        this.authController = null;
        this.authService = null;
        this.authRepository = null;
    }
}

export const authContainer = AuthContainer.getInstance();
