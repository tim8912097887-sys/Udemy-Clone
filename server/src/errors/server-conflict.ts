import { ERROR_CODE } from '#types/index.js';
import { ApiError } from './api.js';

export class ServerConflictError extends ApiError {
    constructor(
        message: string,
        public readonly metadata?: {
            field?: string;
            value?: string;
            resource?: string;
        },
    ) {
        const enrichedMessage =
            metadata?.field && metadata.resource && metadata.value
                ? `${metadata.resource} with ${metadata.field} ${metadata.value} already exists`
                : message;
        super(ERROR_CODE.SERVER_CONFLICT, enrichedMessage, true);
    }
}
