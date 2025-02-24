import { Serializer, SerializerOptions } from '@/main/serializers/base/serializer';
import { showSpinner, showSuccess, showError, showInfo } from '@/main/utils/cli-utils';
import inquirer from 'inquirer';
import { SingleFileGenerator } from './type-generators/single-file-generator';
import { MultipleFilesGenerator } from './type-generators/multiple-files-generator';
import { CollectionReferenceManager } from './collection-reference-manager';
import { OutputFormat } from '@/main/serializers/base/types';

export class TypeScriptSerializer implements Serializer {
    private referenceManager = new CollectionReferenceManager();
    private singleFileGenerator = new SingleFileGenerator(this.referenceManager);
    private multipleFilesGenerator = new MultipleFilesGenerator(this.referenceManager);

    async serialize(options: SerializerOptions): Promise<void> {
        try {
            const outputFormat = await this.promptOutputFormat();
            const collections = Object.entries(options.schema.schemas);
            
            showInfo(`Found ${collections.length} collections to process`);
            
            // Collect all references first
            this.referenceManager.collectReferences(collections);

            if (outputFormat === 'single' || outputFormat === 'both') {
                await this.singleFileGenerator.generate(collections, options.outputDir);
            }
            
            if (outputFormat === 'multiple' || outputFormat === 'both') {
                await this.multipleFilesGenerator.generate(collections, options.outputDir);
            }

        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            throw error;
        }
    }

    private async promptOutputFormat(): Promise<OutputFormat> {
        const { outputFormat } = await inquirer.prompt({
            type: 'list',
            name: 'outputFormat',
            message: 'How would you like to generate the TypeScript types?',
            choices: [
                { name: 'Single file (webflow.types.ts)', value: 'single' },
                { name: 'Multiple files (one per collection)', value: 'multiple' },
                { name: 'Both single file and multiple files', value: 'both' }
            ],
            default: 'single'
        });

        return outputFormat;
    }
} 