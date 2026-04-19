import { logger } from '#configs/logger.js';
import { comparePassword, hashPassword } from '#utils/password.js';
import { AuthRepository } from './repository.js';
import { LoginUserType } from './schemas/login.js';
import { CreateUserType } from './schemas/signup.js';
import { IUser } from '#types/index.js';
import { BadRequestError } from '#errors/bad-request.js';
import { IAuthService } from '#base-interfaces/service.js';

export class AuthService implements IAuthService {
    private readonly logger = logger;
    constructor(private readonly authRepository: AuthRepository) {}

    async signup(userInfo: CreateUserType) {
        const existingUser = await this.authRepository.findByEmail(
            userInfo.email,
        );
        if (existingUser) {
            this.logger.warn(
                `User with email ${userInfo.email} already exists.`,
            );
            return;
        }
        // Hash password
        const hashedPassword = await hashPassword(userInfo.password);
        userInfo.password = hashedPassword;
        const user = { ...userInfo, role: 'user' as const };
        return this.authRepository.create(user);
    }

    async login(userInfo: LoginUserType) {
        const exsistingUser = (await this.authRepository.findByEmail(
            userInfo.email,
            true,
        )) as IUser;
        if (!exsistingUser) {
            this.logger.warn(`User with email ${userInfo.email} not found.`);
            throw new BadRequestError('Email or Password is incorrect.');
        }
        const isMatch = await comparePassword(
            userInfo.password,
            exsistingUser.password,
        );
        if (!isMatch) {
            this.logger.warn(
                `User with email ${userInfo.email} not match password ${userInfo.password}.`,
            );
            throw new BadRequestError('Email or Password is incorrect.');
        }
        const { password: _password, ...user } = exsistingUser;
        return user;
    }

    async refresh(id: string) {
        const existingUser = await this.authRepository.findById(id);
        if (!existingUser) {
            this.logger.warn(`User with id ${id} not found.`);
            throw new BadRequestError('User not found.');
        }
        const { password: _password, ...user } = existingUser;
        return user as IUser;
    }
}
