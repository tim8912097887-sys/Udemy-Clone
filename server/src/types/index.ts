import { Response } from 'express';
import mongoose from 'mongoose';

export enum ERROR_CODE {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    SERVER_CONFLICT = 409,
    TOO_MANY_REQUEST = 429,
    SERVER_UNAVAILABLE = 503,
}

export type ValidationError = {
    field: string;
    value: string;
};

export type State = 'success' | 'error' | 'redirect';

export type ErrorObject = {
    status: string;
    code: ERROR_CODE;
    detail: string;
    errors?: ValidationError[];
};

export type Data = null | any;

export type Params = {
    state: State;
    data?: Data;
    error?: ErrorObject;
};
export type ResponseStructure = {
    state: State;
    error: ErrorObject | null;
    data: Data | null;
    meta: {
        timestamp: string;
    };
};

type UserRole = 'user' | 'admin';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export type UserModelType = mongoose.Model<IUser, object, object>;

export type Payload = {
    sub: string;
};

export type AuthPayload = {
    sub: string;
    iat: number;
    exp: number;
};

export type UserData = {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
};

export type LoginData = {
    message: string;
    user: UserData;
};

export type SuccessResponse<T> = {
    res: Response;
    data: T;
    statusCode?: number;
};
