import z from 'zod';

const EnvSchema = z.object({
    // NODE_ENV Validation
    NODE_ENV: z
        .enum(['development', 'test', 'production'], {
            error: "NODE_ENV must be 'development', 'test', or 'production'",
        })
        .default('development'),

    // PORT Validation
    PORT: z.coerce
        .number({
            error: 'PORT must be a number',
        })
        .int()
        .positive('PORT must be a positive integer')
        .max(65535, 'PORT cannot exceed 65535')
        .default(3000),
    LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug'], {
        error: "Log level must be 'error','warn','info','debug'",
    }),
    MONGO_URI: z
        .string()
        .refine(
            (url) =>
                url.startsWith('mongodb://') ||
                url.startsWith('mongodb+srv://'),
            'URL must begin with mongodb:// or mongodb+srv://',
        )
        .regex(
            /^mongodb(?:\+srv)?:\/\/(?:([^:]+)(?::([^@]+))?@)?([^/?]+)(?:\/([^?]+))?(?:\?(.+))?$/,
            'String is not a valid MongoDB connection URI',
        ),
    SALT_ROUNDS: z.coerce
        .number({
            error: 'Salt must be a number',
        })
        .int()
        .positive('Salt must be a positive integer')
        .default(10),
    CENTRAL_LOG_TOKEN: z.string().nonempty('Central log token is required'),
    JWT_ISSUER: z.string('JWT_ISSUER must be a string'),
    JWT_AUDIENCE: z.string('JWT_AUDIENCE must be a string'),
    REFRESH_TOKEN_SECRET: z
        .string('REFRESH_TOKEN_SECRET must be a string')
        .min(32, 'Refresh Token Secret should be at least 32 charaters'),
    ACCESS_TOKEN_SECRET: z
        .string('ACCESS_TOKEN_SECRET must be a string')
        .min(32, 'Access Token Secret should be at least 32 charaters'),
    REFRESH_TOKEN_EXPIRES_IN: z.string(
        'REFRESH_TOKEN_EXPIRES_IN must be a string',
    ),
    ACCESS_TOKEN_EXPIRES_IN: z.string(
        'ACCESS_TOKEN_EXPIRES_IN must be a string',
    ),
});

const result = EnvSchema.safeParse(process.env);
// Stop the application by throw error
if (!result.success) {
    const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
    console.error(`Environment variables Error: ${errorMessage}`);
    // Should exit when env not available
    process.exit(1);
}
// Validated data
export const env = result.data;
