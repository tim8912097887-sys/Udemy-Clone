import { ZodError } from 'zod';

export const formatValidatedError = (error: ZodError) => {
    const errorMessage = error.issues
        .map((issue) => `- ${issue.path.join('.')} : ${issue.message}`)
        .join('\n');
    return errorMessage;
};
