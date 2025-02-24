import fs from 'fs/promises';
import path from 'path';
import { compile } from 'json-schema-to-typescript';
import { WebflowSchema } from '@/main/serializers/base/types';
import { NameFormatter } from '@/main/serializers/typescript/utils/name-formatter';
import { SchemaConverter } from '@/main/serializers/typescript/utils/schema-converter';
import { CollectionReferenceManager } from '@/main/serializers/typescript/collection-reference-manager';
import { showSpinner, showSuccess, showInfo } from '@/main/utils/cli-utils';

export class MultipleFilesGenerator {
    private schemaConverter: SchemaConverter;

    constructor(private referenceManager: CollectionReferenceManager) {
        this.schemaConverter = new SchemaConverter(referenceManager);
    }

    async generate(collections: [string, WebflowSchema['schemas'][string]][], outputDir: string): Promise<void> {
        // Create types directory
        const typesDir = path.join(outputDir, 'types', 'collections');
        await fs.mkdir(typesDir, { recursive: true });
        showInfo(`Creating types directory at ${typesDir}`);

        // Generate types for each collection
        for (const [collectionId, collection] of collections) {
            const spinner = await showSpinner(`Generating types for ${collection.name}...`);
            
            const slug = collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const typeNames = NameFormatter.parseCollectionName(slug);
            
            const { metaSchema, rowSchema } = this.schemaConverter.splitSchema(collection, collectionId);
            
            const metaType = await compile(metaSchema, typeNames.meta, {
                bannerComment: '',
                style: { singleQuote: true, semi: true, printWidth: 100, tabWidth: 2 }
            });

            const rowType = await compile(rowSchema, typeNames.row, {
                bannerComment: '',
                style: { singleQuote: true, semi: true, printWidth: 100, tabWidth: 2 }
            });

            const processedMetaType = metaType
                .replace('export ', '')
                .replace(/interface \w+/, `interface ${typeNames.meta}`);

            const processedRowType = rowType
                .replace('export ', '')
                .replace(/interface \w+/, `interface ${typeNames.row}`);

            const fileContent = 
                `import { WebflowCollections } from '../webflow.types';\n\n` +
                `export ${processedMetaType}\n\n` +
                `export ${processedRowType}\n\n` +
                `export interface ${typeNames.base}Item {\n` +
                `  meta: ${typeNames.meta};\n` +
                `  row: ${typeNames.row};\n` +
                `}\n`;

            const typePath = path.join(typesDir, `${slug}.ts`);
            await fs.writeFile(typePath, fileContent);
            
            spinner.success({ text: `Generated types for ${collection.name}` });
        }

        // Generate index file
        showInfo('Generating index file...');
        const indexContent = collections
            .map(([_, collection]) => {
                const slug = NameFormatter.sanitizeFileName(collection.name);
                return `export * from './${slug}';`;
            })
            .join('\n');
        
        const indexPath = path.join(typesDir, 'index.ts');
        await fs.writeFile(indexPath, indexContent + '\n');
        
        showSuccess(`
Generated multiple type files:
- Output directory: ${typesDir}
- Collections processed: ${collections.length}
- Index file: ${indexPath}
        `);
    }
} 