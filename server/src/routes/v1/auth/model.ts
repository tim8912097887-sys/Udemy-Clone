import { logger } from '#configs/logger.js';
import { BadRequestError } from '#errors/bad-request.js';
import { IUser, UserModelType, ValidationError } from '#types/index.js';
import mongoose from 'mongoose';
import v from 'validator';

const UserSchema = new mongoose.Schema<IUser, object, object>(
    {
        name: {
            type: String,
            required: [true, 'Username required'],
            minLength: [2, 'Username at least two character'],
            // Prevent large data
            maxLength: [60, 'Username at most sixty character'],
            match: [
                /^[A-Za-z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores',
            ],
            trim: true,
            toLowerCase: true,
            // Remove dangerous character
            setter: (val: string) => {
                const stripedString = '\'`"\\\\/<>&';
                return v.blacklist(val, stripedString);
            },
            cast: '{VALUE} is not a string',
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            // Prevent large data
            maxLength: [60, 'Email at most sixty character'],
            trim: true,
            unique: true,
            // Prevent duplicate email
            lowercase: true,
            validate: {
                validator: (val: string) => {
                    return v.isEmail(val);
                },
                message: 'Invalid Email',
            },
            cast: '{VALUE} is not a string',
        },
        password: {
            type: String,
            minLength: [8, 'Password at least eight character'],
            trim: true,
            required: [true, 'Password required'],
            // Prevent accidentally select
            select: false,
            validate: {
                validator: (val: string) => {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                        val,
                    );
                },
                message:
                    'Password should include small and big letter and number and one special character',
            },
            cast: '{VALUE} is not a string',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    },
);

// Handle error after save, such as duplicate key and validation error
UserSchema.post('save', function (error: any, _doc: unknown, _next: unknown) {
    // Handle Duplicate Key (Conflict)
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        logger.warn(`Duplicate key error on field: ${field}
                         ${field.charAt(0).toUpperCase() + field.slice(1)} already exists.
        `);
        throw new Error('Internal Server Error');
    }
    // Handle Validation Error
    if (error.name === 'ValidationError') {
        const metadata: ValidationError[] = Object.keys(error.errors).map(
            (key) => ({
                field: key,
                value: String(error.errors[key].value || 'unknown'),
            }),
        );

        const firstMessage = error.errors[Object.keys(error.errors)[0]].message;
        logger.warn(
            `Mongoose Validation error mapped: ${JSON.stringify(metadata)}`,
        );
        throw new BadRequestError(firstMessage, metadata);
    }
    // Handle Cast Error
    if (error.name === 'CastError') {
        const metadata: ValidationError[] = [
            {
                field: error.path,
                value: String(error.value || 'unknown'),
            },
        ];

        const message = `Invalid ${error.path}: ${error.value}`;
        logger.warn(`Mongoose Cast error mapped: ${message}`);
        throw new BadRequestError(message, metadata);
    }
    // Log other errors for debugging
    logger.error(`Error saving user: ${error.message}`);
    // Rethrow other errors to be handled by global error handler
    throw new Error('An unexpected error occurred while saving the user.');
});

export const UserModel = mongoose.model<IUser, UserModelType>(
    'User',
    UserSchema,
);
