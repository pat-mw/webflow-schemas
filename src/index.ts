import { validateEnv } from './env';
import { Cli } from './cli';

// Validate environment variables
const env = validateEnv();

// Initialise CLI
const cli = new Cli(env);
cli.run();