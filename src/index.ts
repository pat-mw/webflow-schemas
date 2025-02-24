#!/usr/bin/env node
import { program } from 'commander';
import { validateEnv } from './main/env';
import { Cli } from './main/cli';

async function main() {
    try {
        const env = validateEnv();
        const cli = new Cli(env);
        await cli.run();
    } catch (error) {
        console.error('Failed to start CLI:', error);
        process.exit(1);
    }
}

program
    .version('1.0.0')
    .description('Webflow Schema Fetcher CLI')
    .action(main);

program.parse();