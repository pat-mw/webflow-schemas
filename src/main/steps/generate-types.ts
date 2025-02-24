import { Step, StepContext } from "./base";
import { showSpinner, showSuccess, showError, showInfo } from '@/main/utils/cli-utils';
import fs from 'fs/promises';
import path from 'path';
import { compile } from 'json-schema-to-typescript';
import inquirer from 'inquirer';

interface WebflowField {
    id: string;
    isEditable: boolean;
    isRequired: boolean;
    type: string;
    slug?: string;
    displayName: string;
    helpText?: string;
    validations: {
        options?: Array<{ name: string; id: string }>;
        collectionId?: string;
        singleLine?: boolean;
        maxLength?: number;
        pattern?: any;
        messages?: Record<string, string>;
        format?: string;
        precision?: number;
        allowNegative?: boolean;
        minValue?: number;
        maxValue?: number;
    } | null;
}

interface WebflowSchema {
    last_synced: string;
    schemas: Record<string, {
        name: string;
        fields: WebflowField[];
    }>;
}

interface CollectionReference {
    collectionId: string;
    fieldName: string;
    isMultiple: boolean;
}

export class GenerateTypesStep implements Step {
    private collectionReferences: Map<string, CollectionReference[]> = new Map();

    async execute(context: StepContext): Promise<void> {
        try {
            const spinner = await showSpinner('Reading schema file...');
            
            // Read schema file
            const schemaPath = path.join(process.cwd(), 'out', 'webflow.schema.json');
            const schemaContent = await fs.readFile(schemaPath, 'utf-8');
            const schema = JSON.parse(schemaContent) as WebflowSchema;
            
            spinner.success({ text: 'Schema file loaded successfully' });

            const { outputFormat } = await inquirer.prompt({
                type: 'list',
                name: 'outputFormat',
                message: 'How would you like to generate the TypeScript types?',
                choices: [
                    { 
                        name: 'Single file (webflow.types.ts)',
                        value: 'single'
                    },
                    { 
                        name: 'Multiple files (one per collection)',
                        value: 'multiple'
                    },
                    {
                        name: 'Both single file and multiple files',
                        value: 'both'
                    }
                ],
                default: 'single'
            });

            const collections = Object.entries(schema.schemas);
            showInfo(`Found ${collections.length} collections to process`);

            if (outputFormat === 'single' || outputFormat === 'both') {
                await this.generateSingleFile(collections);
            }
            
            if (outputFormat === 'multiple' || outputFormat === 'both') {
                await this.generateMultipleFiles(collections);
            }

        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }

    private parseCollectionName(slug: string): { base: string, meta: string, row: string } {
        // Define known acronyms that should be uppercase
        const knownAcronyms = ['sku', 'api', 'url', 'id', 'ui'];
        
        // Convert slug to parts
        const parts = slug.split('-');
        
        // Process each part
        const processedParts = parts.map(part => {
            const lower = part.toLowerCase();
            // If it's a known acronym, uppercase the whole part
            if (knownAcronyms.includes(lower)) {
                return part.toUpperCase();
            }
            // Otherwise capitalize normally
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        });
        
        const base = processedParts.join('');
        
        return {
            base,
            meta: `${base}Meta`,
            row: `${base}Row`
        };
    }

    private async generateSingleFile(collections: [string, WebflowSchema['schemas'][string]][]): Promise<void> {
        const spinner = await showSpinner('Generating single types file...');
        
        // First pass - collect all references
        for (const [collectionId, collection] of collections) {
            const references: CollectionReference[] = [];
            
            for (const field of collection.fields) {
                if ((field.type === 'Reference' || field.type === 'MultiReference') && 
                    field.validations?.collectionId) {
                    references.push({
                        collectionId: field.validations.collectionId,
                        fieldName: field.slug || field.id,
                        isMultiple: field.type === 'MultiReference'
                    });
                }
            }
            
            if (references.length > 0) {
                this.collectionReferences.set(collectionId, references);
            }
        }

        let typeDefinitions = `/**
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
 *    type ProductsRels = WebflowCollections['Products']['Relations']
 */

export interface WebflowCollections {\n`;
        
        for (const [collectionId, collection] of collections) {
            const { metaSchema, rowSchema } = this.splitSchema(collection, collectionId);
            
            const slug = collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const typeNames = this.parseCollectionName(slug);
            
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
            typeDefinitions += this.generateRelationships(collectionId);
            typeDefinitions += `  };\n\n`;
        }

        typeDefinitions += `}\n\n`;
        typeDefinitions += `export type Collection<T extends keyof WebflowCollections> = WebflowCollections[T]['Row'];\n`;
        typeDefinitions += `export type CollectionMeta<T extends keyof WebflowCollections> = WebflowCollections[T]['meta'];\n`;
        typeDefinitions += `export type CollectionRelations<T extends keyof WebflowCollections> = WebflowCollections[T]['Relations'];\n`;

        const outputPath = path.join(process.cwd(), 'out', 'webflow.types.ts');
        await fs.writeFile(outputPath, typeDefinitions);
        
        spinner.success({ text: 'Single file types generated successfully' });
        showSuccess(`Generated single types file: ${outputPath}`);
    }

    private generateRelationships(collectionId: string): string {
        const references = this.collectionReferences.get(collectionId);
        if (!references?.length) {
            return `    Relations: [];\n`;
        }

        let relationships = `    Relations: [\n`;
        for (const ref of references) {
            relationships += `      {\n`;
            relationships += `        foreignCollection: "${ref.collectionId}",\n`;
            relationships += `        fieldName: "${ref.fieldName}",\n`;
            relationships += `        isMultiple: ${ref.isMultiple},\n`;
            relationships += `      },\n`;
        }
        relationships += `    ];\n`;
        return relationships;
    }

    private async generateMultipleFiles(collections: [string, WebflowSchema['schemas'][string]][]): Promise<void> {
        // Create types directory
        const typesDir = path.join(process.cwd(), 'out', 'types', 'collections');
        await fs.mkdir(typesDir, { recursive: true });
        showInfo(`Creating types directory at ${typesDir}`);

        // Generate types for each collection
        for (const [collectionId, collection] of collections) {
            const spinner = await showSpinner(`Generating types for ${collection.name}...`);
            
            const slug = collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const typeNames = this.parseCollectionName(slug);
            
            const { metaSchema, rowSchema } = this.splitSchema(collection, collectionId);
            
            // Use consistent naming
            const metaType = await compile(metaSchema, typeNames.meta, {
                bannerComment: '',
                style: { singleQuote: true, semi: true, printWidth: 100, tabWidth: 2 }
            });

            const rowType = await compile(rowSchema, typeNames.row, {
                bannerComment: '',
                style: { singleQuote: true, semi: true, printWidth: 100, tabWidth: 2 }
            });

            // Replace the interface names in the compiled output with our consistent names
            const processedMetaType = metaType
                .replace('export ', '')
                .replace(/interface \w+/, `interface ${typeNames.meta}`);

            const processedRowType = rowType
                .replace('export ', '')
                .replace(/interface \w+/, `interface ${typeNames.row}`);

            const fileContent = 
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
        const indexContent = Object.values(collections)
            .map(([_, collection]) => `export * from './${this.sanitizeFileName(collection.name)}';`)
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

    private sanitizeFileName(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    private getJsonSchemaType(field: WebflowField, collectionId: string): any {
        if (field.type === 'Reference' && field.validations?.collectionId) {
            return {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    _reference: { 
                        type: 'string',
                        const: field.validations.collectionId 
                    }
                },
                required: ['_id', '_reference'],
                description: `Reference to collection: ${field.validations.collectionId}`,
                additionalProperties: true // Allow additional properties from referenced collection
            };
        }

        if (field.type === 'MultiReference' && field.validations?.collectionId) {
            return {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        _reference: { 
                            type: 'string',
                            const: field.validations.collectionId 
                        }
                    },
                    required: ['_id', '_reference'],
                    additionalProperties: true // Allow additional properties from referenced collection
                },
                description: `MultiReference to collection: ${field.validations.collectionId}`
            };
        }

        const baseType = this.getBaseJsonSchemaType(field.type);
        
        // Apply validations if they exist
        if (field.validations) {
            // Handle Option fields with predefined choices
            if (field.type === 'Option' && field.validations.options) {
                return {
                    type: 'string',
                    enum: field.validations.options.map(opt => opt.name),
                    description: field.helpText
                };
            }

            // Handle text field validations
            if ((field.type === 'PlainText' || field.type === 'RichText') && field.validations) {
                const textType = { ...baseType };
                if (field.validations.maxLength) {
                    textType.maxLength = field.validations.maxLength;
                }
                if (field.validations.pattern) {
                    textType.pattern = field.validations.pattern;
                }
                return textType;
            }

            // Handle number validations
            if (field.type === 'Number' && field.validations) {
                const numberType = { ...baseType };
                if (field.validations.minValue !== undefined) {
                    numberType.minimum = field.validations.minValue;
                }
                if (field.validations.maxValue !== undefined) {
                    numberType.maximum = field.validations.maxValue;
                }
                if (field.validations.precision) {
                    numberType.multipleOf = 1 / Math.pow(10, field.validations.precision);
                }
                return numberType;
            }
        }

        return baseType;
    }

    private getBaseJsonSchemaType(fieldType: string): any {
        switch (fieldType) {
            case 'PlainText':
            case 'RichText':
            case 'Email':
            case 'Phone':
            case 'Link':
            case 'Color':
                return { type: 'string' };
            case 'Number':
                return { type: 'number' };
            case 'Switch':
                return { type: 'boolean' };
            case 'DateTime':
                return { type: 'string', format: 'date-time' };
            case 'Image':
                return {
                    type: 'object',
                    properties: {
                        url: { type: 'string' },
                        alt: { type: 'string' },
                        width: { type: 'number' },
                        height: { type: 'number' },
                    }
                };
            case 'MultiImage':
                return {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            alt: { type: 'string' },
                            width: { type: 'number' },
                            height: { type: 'number' },
                        }
                    }
                };
            default:
                return { type: 'string' };
        }
    }

    private splitSchema(collection: WebflowSchema['schemas'][string], collectionId: string): { metaSchema: any, rowSchema: any } {
        // Helper function to format display name
        const formatDisplayName = (name: string) => {
            return name.split(/[-\s]+/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        };

        // Meta schema contains all the metadata properties
        const metaSchema = {
            type: 'object',
            title: `${collection.name}Meta`,
            properties: {
                _id: { 
                    type: 'string',
                    // Add serialization for _id
                    examples: ['123']
                },
                _collectionId: { 
                    type: 'string',
                    const: collectionId
                },
                slug: {
                    type: 'string',
                    const: collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                },
                displayName: {
                    type: 'string',
                    const: formatDisplayName(collection.name)
                }
            },
            required: ['_id', '_collectionId', 'slug', 'displayName'],
            additionalProperties: false,
        };

        // Row schema contains only the dynamic CMS properties
        const properties: Record<string, any> = {};
        const required: string[] = [];

        for (const field of collection.fields) {
            // Skip meta fields since they're handled separately
            if (field.slug === 'slug' || field.slug === 'displayName') continue;
            
            const propName = field.slug || field.id;
            properties[propName] = this.getJsonSchemaType(field, collectionId);
            if (field.isRequired) {
                required.push(propName);
            }
        }

        const rowSchema = {
            type: 'object',
            title: collection.name,
            properties,
            required,
            additionalProperties: false,
        };

        return { metaSchema, rowSchema };
    }

    private convertToJsonSchema(collection: WebflowSchema['schemas'][string], collectionId: string): any {
        // Helper function to format display name
        const formatDisplayName = (name: string) => {
            // Convert to title case and preserve spaces
            return name.split(/[-\s]+/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        };

        const properties: Record<string, any> = {
            _id: { type: 'string' },
            _collectionId: { 
                type: 'string',
                const: collectionId
            },
            slug: {
                type: 'string',
                const: collection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
            },
            displayName: {
                type: 'string',
                const: formatDisplayName(collection.name)
            }
        };
        
        const required: string[] = ['_id', '_collectionId', 'slug', 'displayName'];

        for (const field of collection.fields) {
            // Skip both slug and displayName fields since we're handling them specially
            if (field.slug === 'slug' || field.slug === 'displayName') continue;
            
            const propName = field.slug || field.id;
            properties[propName] = this.getJsonSchemaType(field, collectionId);
            if (field.isRequired) {
                required.push(propName);
            }
        }

        return {
            type: 'object',
            title: collection.name,
            properties,
            required,
            additionalProperties: false,
        };
    }

    // Add helper method to generate example fields
    private generateExampleFields(fields: WebflowField[]): string {
        return fields
            .filter(field => field.isRequired && field.slug !== 'name') // Skip name as it's already included
            .map(field => {
                const exampleValue = this.getExampleValue(field);
                return `${field.slug}: ${exampleValue},`;
            })
            .join('\n    ');
    }

    private getExampleValue(field: WebflowField): string {
        switch (field.type) {
            case 'PlainText':
            case 'RichText':
            case 'Color':
                return `'Example ${field.displayName}'`;
            case 'Number':
                return '0';
            case 'Switch':
                return 'false';
            case 'DateTime':
                return "'2024-01-01T00:00:00Z'";
            default:
                return `'Example ${field.displayName}'`;
        }
    }
} 