import { WebflowSchema } from './types';

export interface SerializerOptions {
    outputDir: string;
    schema: WebflowSchema;
}

export interface Serializer {
    serialize(options: SerializerOptions): Promise<void>;
} 