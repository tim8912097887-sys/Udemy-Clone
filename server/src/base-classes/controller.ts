import { logger } from '#configs/logger.js';
import { SuccessResponse } from '#src/types/index.js';
import { responseEnvelope } from '#utils/responseEnvelope.js';
import { sendSuccessResponse } from '#utils/sendResponse.js';

export class BaseController {
    protected readonly logger = logger;

    protected ok<T>({ res, data, statusCode }: SuccessResponse<T>) {
        return sendSuccessResponse(
            res,
            responseEnvelope({
                state: 'success',
                data,
            }),
            statusCode,
        );
    }
}
