import fs from 'fs/promises';
import path from 'path';
import { compile } from 'json-schema-to-typescript';
import { WebflowSchema } from '@/main/serializers/base/types';
import { NameFormatter } from '@/main/serializers/typescript/utils/name-formatter';
import { CollectionReferenceManager } from '@/main/serializers/typescript/collection-reference-manager';
import { SchemaConverter } from '@/main/serializers/typescript/utils/schema-converter';
import { showSpinner, showSuccess } from '@/main/utils/cli-utils';

export class SingleFileGenerator {
    private schemaConverter: SchemaConverter;

    constructor(private referenceManager: CollectionReferenceManager) {
        this.schemaConverter = new SchemaConverter(referenceManager);
    }

    async generate(collections: [string, WebflowSchema['schemas'][string]][], outputDir: string): Promise<void> {
        const spinner = await showSpinner('Generating single types file...');
        
        let typeDefinitions = this.generateHeader();
        
        for (const [collectionId, collection] of collections) {
            const { metaSchema, rowSchema } = this.schemaConverter.splitSchema(collection, collectionId);
            
            const slug = collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const typeNames = NameFormatter.parseCollectionName(slug);
            
            const rowTypes = await compile(rowSchema, typeNames.row, {
                bannerComment: '',
                style: {
                    singleQuote: true,
                    semi: true,
                    printWidth: 100,
                    tabWidth: 2,
                }
            });

            const metaTypes = await compile(metaSchema, typeNames.meta, {
                bannerComment: '',
                style: {
                    singleQuote: true,
                    semi: true,
                    printWidth: 100,
                    tabWidth: 2,
                }
            });

            const safeCollectionName = JSON.stringify(collection.name);
            
            typeDefinitions += `  ${safeCollectionName}: {\n`;
            typeDefinitions += `    meta: ${metaTypes.replace(/export interface \w+ /, '')}\n`;
            typeDefinitions += `    Row: ${rowTypes.replace(/export interface \w+ /, '')}\n`;
            typeDefinitions += `    refs: {\n`;
            typeDefinitions += this.referenceManager.generateTypeReferences(collectionId);
            typeDefinitions += `    };\n`;
            typeDefinitions += this.referenceManager.generateRelationships(collectionId);
            typeDefinitions += `  };\n\n`;
        }

        typeDefinitions += this.generateFooter();

        // Create types directory if it doesn't exist
        const typesDir = path.join(outputDir, 'types');
        await fs.mkdir(typesDir, { recursive: true });
        
        const outputPath = path.join(typesDir, 'webflow.types.ts');
        await fs.writeFile(outputPath, typeDefinitions);
        
        spinner.success({ text: 'Single file types generated successfully' });
        showSuccess(`Generated single types file: ${outputPath}`);
    }

    private generateHeader(): string {
        return `/**
 * Webflow Collections Type System
 * ------------------------------
 * 
 * Usage:
 * 1. For collection rows (content):
 *    type Products = Collection<'Products'>
 * 
 * 2. For collection metadata:
 *    type ProductsMeta = CollectionMeta<'Products'>
 * 
 * 3. For collection relationships:
 *    type ProductsRelations = CollectionRelations<'Products'>
 * 
 * 4. Direct access to collection types:
 *    type ProductsData = WebflowCollections['Products']['Row']
 *    type ProductsMeta = WebflowCollections['Products']['meta']
 *    type ProductsRefs = WebflowCollections['Products']['refs']['product-category']
 */

export interface WebflowCollections {\n`;
    }

    private generateFooter(): string {
        return `}\n\n` +
            `export type Collection<T extends keyof WebflowCollections> = WebflowCollections[T]['Row'];\n` +
            `export type CollectionMeta<T extends keyof WebflowCollections> = WebflowCollections[T]['meta'];\n` +
            `export type CollectionRelations<T extends keyof WebflowCollections> = WebflowCollections[T]['Relations'];\n` +
            `export type CollectionRef<T extends keyof WebflowCollections, F extends keyof WebflowCollections[T]['refs']> = WebflowCollections[T]['refs'][F];\n`;
    }
} 