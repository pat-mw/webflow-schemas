import { CollectionReference, WebflowSchema } from '@/main/serializers/base/types';

export class CollectionReferenceManager {
    private references: Map<string, CollectionReference[]> = new Map();
    private collectionIdToName: Map<string, string> = new Map();

    collectReferences(collections: [string, WebflowSchema['schemas'][string]][]): void {
        // First build the ID to name mapping
        for (const [collectionId, collection] of collections) {
            this.collectionIdToName.set(collectionId, collection.name);
        }

        // Then collect references using collection names instead of IDs
        for (const [collectionId, collection] of collections) {
            const references: CollectionReference[] = [];
            
            for (const field of collection.fields) {
                if ((field.type === 'Reference' || field.type === 'MultiReference') && 
                    field.validations?.collectionId) {
                    const referencedCollectionName = this.collectionIdToName.get(field.validations.collectionId);
                    if (referencedCollectionName) {
                        references.push({
                            collectionId: field.validations.collectionId,
                            collectionName: referencedCollectionName,
                            fieldName: field.slug || field.id,
                            isMultiple: field.type === 'MultiReference',
                            isRequired: field.isRequired
                        });
                    }
                }
            }
            
            if (references.length > 0) {
                this.references.set(collectionId, references);
            }
        }
    }

    generateTypeReferences(collectionId: string): string {
        const references = this.references.get(collectionId);
        if (!references?.length) {
            return '';
        }

        let typeRefs = '';
        for (const ref of references) {
            const refType = `WebflowCollections[${JSON.stringify(ref.collectionName)}]['Row']`;
            const optionalModifier = ref.isRequired ? '' : '?';
            
            if (ref.isMultiple) {
                typeRefs += `    /** MultiReference to collection: ${ref.collectionId} */\n`;
                typeRefs += `    '${ref.fieldName}'${optionalModifier}: (${refType} | { _id: string; _reference: '${ref.collectionId}'; [k: string]: unknown; })[];\n`;
            } else {
                typeRefs += `    /** Reference to collection: ${ref.collectionId} */\n`;
                typeRefs += `    '${ref.fieldName}'${optionalModifier}: ${refType} | { _id: string; _reference: '${ref.collectionId}'; [k: string]: unknown; };\n`;
            }
        }
        return typeRefs;
    }

    generateRelationships(collectionId: string): string {
        const references = this.references.get(collectionId);
        if (!references?.length) {
            return `    Relations: [];\n`;
        }

        let relationships = `    Relations: [\n`;
        for (const ref of references) {
            relationships += `      {\n`;
            relationships += `        foreignCollection: "${ref.collectionId}",\n`;
            relationships += `        fieldName: "${ref.fieldName}",\n`;
            relationships += `        isMultiple: ${ref.isMultiple},\n`;
            relationships += `        isRequired: ${ref.isRequired},\n`;
            relationships += `      },\n`;
        }
        relationships += `    ];\n`;
        return relationships;
    }

    getCollectionName(collectionId: string): string | undefined {
        return this.collectionIdToName.get(collectionId);
    }
} 