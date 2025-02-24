import { Step, StepContext } from "./base";
import { showSpinner, showError } from '@/main/utils/cli-utils';
import fs from 'fs/promises';
import path from 'path';
import { TypeScriptSerializer } from '../serializers/typescript';

export class GenerateTypesStep implements Step {
    async execute(_context: StepContext): Promise<void> {
        try {
            const spinner = await showSpinner('Reading schema file...');
            
            // Read schema file
            const schemaPath = path.join(process.cwd(), 'out', 'webflow.schema.json');
            const schemaContent = await fs.readFile(schemaPath, 'utf-8');
            const schema = JSON.parse(schemaContent);
            
            spinner.success({ text: 'Schema file loaded successfully' });

            const serializer = new TypeScriptSerializer();
            await serializer.serialize({
                outputDir: path.join(process.cwd(), 'out'),
                schema
            });

        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }
} 