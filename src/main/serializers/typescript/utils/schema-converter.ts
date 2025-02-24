import { WebflowField, WebflowSchema } from '@/main/serializers/base/types';
import { CollectionReferenceManager } from '@/main/serializers/typescript/collection-reference-manager';

export class SchemaConverter {
    constructor(private referenceManager: CollectionReferenceManager) {}

    splitSchema(collection: WebflowSchema['schemas'][string], collectionId: string): { metaSchema: any, rowSchema: any } {
        // Meta schema contains all the metadata properties
        const metaSchema = {
            type: 'object',
            title: `${collection.name}Meta`,
            properties: {
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
                    const: this.formatDisplayName(collection.name)
                }
            },
            required: ['_collectionId', 'slug', 'displayName'],
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

    private formatDisplayName(name: string): string {
        return name.split(/[-\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    private getJsonSchemaType(field: WebflowField, _collectionId: string): any {
        if (field.type === 'Reference' && field.validations?.collectionId) {
            const referencedCollectionName = this.referenceManager.getCollectionName(field.validations.collectionId);
            if (referencedCollectionName) {
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
                    additionalProperties: true,
                    tsType: `WebflowCollections[${JSON.stringify(referencedCollectionName)}]['Row']`
                };
            }
        }

        if (field.type === 'MultiReference' && field.validations?.collectionId) {
            const referencedCollectionName = this.referenceManager.getCollectionName(field.validations.collectionId);
            if (referencedCollectionName) {
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
                        additionalProperties: true,
                        tsType: `WebflowCollections[${JSON.stringify(referencedCollectionName)}]['Row']`
                    },
                    description: `MultiReference to collection: ${field.validations.collectionId}`
                };
            }
        }

        const baseType = this.getBaseJsonSchemaType(field.type);
        
        if (field.validations) {
            if (field.type === 'Option' && field.validations.options) {
                return {
                    type: 'string',
                    enum: field.validations.options.map(opt => opt.name),
                    description: field.helpText
                };
            }

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
} 