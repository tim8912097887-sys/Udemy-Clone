import { LoginUserType } from '#routes/v1/auth/schemas/login.js';
import { CreateUserType } from '#routes/v1/auth/schemas/signup.js';
import { IUser } from '#types/index.js';

export interface IAuthService {
    signup(userInfo: CreateUserType): Promise<Partial<IUser> | undefined>;
    login(userInfo: LoginUserType): Promise<Partial<IUser>>;
    refresh(id: string): Promise<Partial<IUser>>;
}
