import { ERROR_CODE } from '#types/index.js';
import { ApiError } from './api.js';

export class ForbiddenError extends ApiError {
    constructor(
        message: string,
        public readonly metadata?: {
            action?: string;
            reason?: string;
            resource?: string;
        },
    ) {
        const enrichedMessage =
            metadata?.action && metadata.resource
                ? `You don't have permission to ${metadata.action} on ${metadata.resource}`
                : message;
        super(ERROR_CODE.FORBIDDEN, enrichedMessage, true);
    }
}
