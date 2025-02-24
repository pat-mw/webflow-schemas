export interface TypeNames {
    base: string;
    meta: string;
    row: string;
}

export class NameFormatter {
    private static readonly KNOWN_ACRONYMS = ['sku', 'api', 'url', 'id', 'ui'];

    static parseCollectionName(slug: string): TypeNames {
        const parts = slug.split('-');
        
        const processedParts = parts.map(part => {
            const lower = part.toLowerCase();
            return this.KNOWN_ACRONYMS.includes(lower) 
                ? part.toUpperCase()
                : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        });
        
        const base = processedParts.join('');
        
        return {
            base,
            meta: `${base}Meta`,
            row: `${base}Row`
        };
    }

    static sanitizeFileName(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
} 