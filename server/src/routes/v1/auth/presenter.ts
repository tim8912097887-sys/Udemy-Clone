import { LoginData } from '#types/index.js';

export const toMessageResponse = (message: string) => ({ message });

export const toUserResponse = (loginData: LoginData) => {
    const returnUser = {
        id: loginData.user._id.toString(),
        name: loginData.user.name,
        email: loginData.user.email,
        role: loginData.user.role,
    };
    return {
        message: loginData.message,
        user: returnUser,
    };
};
