import { Step, StepContext } from "./base";
import { showSpinner, showSuccess, showError } from '@/main/utils/cli-utils';
import fs from 'fs/promises';
import path from 'path';

export class FetchSchemaStep implements Step {
    async execute(context: StepContext): Promise<void> {
        try {
            const spinner = await showSpinner('Fetching collection details...');
            
            const schemaData = {
                last_synced: new Date().toISOString(),
                schemas: {} as Record<string, { 
                    name: string;
                    fields: any[];
                }>
            };
            
            if (!context.selectedCollections) {
                throw new Error('No collections selected');
            }

            for (const collectionId of context.selectedCollections) {
                const details = await context.webflow.collections.get(collectionId);
                
                if (!details) {
                    throw new Error(`Failed to fetch details for collection ${collectionId}`);
                }
                
                schemaData.schemas[collectionId] = {
                    name: details.displayName || collectionId,
                    fields: details.fields || []
                };
            }

            const outDir = path.join(process.cwd(), 'out');
            await fs.mkdir(outDir, { recursive: true });

            const schemaPath = path.join(outDir, 'webflow.schema.json');
            await fs.writeFile(
                schemaPath, 
                JSON.stringify(schemaData, null, 2)
            );

            spinner.success({ text: `Collection schemas written to ${schemaPath}` });
            showSuccess(`Generated schema for ${Object.keys(schemaData.schemas).length} collections`);
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }
} 