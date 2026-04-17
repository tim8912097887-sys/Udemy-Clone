import { Params, ResponseStructure } from '#types/index.js';

export const responseEnvelope = (params: Params) => {
    const baseResponse: ResponseStructure = {
        state: params.state,
        error: null,
        data: null,
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
    // Only include error or data when they exist to reduce response size
    if (params.error) {
        baseResponse.error = params.error;
    }
    if (params.data) {
        baseResponse.data = params.data;
    }

    return baseResponse;
};
