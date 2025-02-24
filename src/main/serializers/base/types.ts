import { type Field as WebflowApiField } from '@/main/webflow/client';

// Extend the built-in FieldType with our additional types
type ExtendedFieldType = WebflowApiField['type'] | 'Reference' | 'MultiReference' | 'Option';

// Extend the Field type with our additions
export type WebflowField = Omit<WebflowApiField, 'type'> & {
    type: ExtendedFieldType;
    isEditable: boolean;
    isRequired: boolean;
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
};

export interface WebflowSchema {
    last_synced: string;
    schemas: Record<string, {
        name: string;
        fields: WebflowField[];
    }>;
}

export interface CollectionReference {
    collectionId: string;
    collectionName: string;
    fieldName: string;
    isMultiple: boolean;
    isRequired: boolean;
}

export type OutputFormat = 'single' | 'multiple' | 'both'; 