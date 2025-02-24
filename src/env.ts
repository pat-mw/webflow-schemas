import { z } from 'zod';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Define env schema with Zod
const envSchema = z.object({
    // Required fields
    WEBFLOW_ACCESS_TOKEN: z.string({
        required_error: "WEBFLOW_ACCESS_TOKEN is required",
    }),
    WEBFLOW_SITE_ID: z.string().optional(),
    
    // Optional fields with defaults
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Create a type from the schema
type Env = z.infer<typeof envSchema>;

const validateEnv = () => {
    const env = envSchema.parse(process.env) as Env;
    return env;
}

export { validateEnv, type Env };