# Webflow Schema CLI

A CLI tool for generating type-safe schemas from Webflow CMS collections. This tool helps bridge the gap between Webflow's dynamic content and type-safe development environments by automatically generating TypeScript types from your Webflow collections.

> ⚠️ **Note**: This project is currently experimental and likely contains bugs. Contributions and feedback are warmly welcomed!

![CLI Demo](lib/demo.gif)

## Features

- 🔄 Fetch and sync collection schemas from Webflow
- 📝 Generate TypeScript type definitions
- 🔗 Handle collection references and multi-references
- 🎯 Support for all Webflow field types
- 📦 Output in multiple formats (single file or per-collection)
- ⚡ Fast and efficient schema generation
- 🛠️ Extensible serializer architecture

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

## Usage

3. Run the CLI

```bash
npm start
```

## Usage

1. Create a `.env` file with your Webflow credentials:

```env
WEBFLOW_ACCESS_TOKEN=your-access-token
WEBFLOW_SITE_ID=your-site-id # Optional
```

2. Run the CLI:

```bash
npm start
```

3. Follow the interactive prompts to:
   - Select your Webflow site (if not specified in .env)
   - Choose which collections to sync
   - Select output format (single file or multiple files)

## Output Examples

The tool can generate TypeScript definitions in two formats:

### 1. Single File Output (`webflow.types.ts`)

```typescript
export interface WebflowCollections {
    "Events": {
        meta: {
          collectionId: string;
          slug: string;
          displayName: string;
        };
        Row: {
          name: string;
          date: string;
          venue: VenueReference;
          description: string;
        };
        refs: {
          venue: WebflowCollections['Venues']['Row'];
        };
        Relations: [
          {
            foreignCollection: "venues";
            fieldName: "venue";
            isMultiple: false;
            isRequired: true;
          }
        ];
    },
    // ... other collections
}
export type Collection<T extends keyof WebflowCollections> = WebflowCollections[T]['Row'];
export type CollectionMeta<T extends keyof WebflowCollections> = WebflowCollections[T]['meta'];
export type CollectionRelations<T extends keyof WebflowCollections> = WebflowCollections[T['Relations'];
```

Usage:
1. For collection rows (content):
```typescript
type Events = Collection<'Events'>
```
2. For collection metadata:
```typescript
type EventsMeta = CollectionMeta<'Events'>
```
3. For collection relationships:
```typescript
type EventsRelations = CollectionRelations<'Events'>
```

You can also access nested types directly:
```typescript
type EventTags = Collection<'Events'>['event-tags']
```

This will automatically resolve the reference and multiple reference fields.

### 2. Multiple Files Output

```typescript
// collections/events.ts
export interface EventsMeta {
    collectionId: string;
    slug: string;
    displayName: string;
}
export interface EventsRow {
    name: string;
    date: string;
    venue: VenueReference;
    description: string;
}
export interface EventsItem {
    meta: EventsMeta;
    row: EventsRow;
}

// collections/index.ts
export from './events';
export from './venues';
export from './blog-posts';

// ... other exports
```


## Architecture

The tool is built with extensibility in mind, following a modular architecture:

```
src/
├── main/
│ ├── serializers/ # Output format implementations
│ │ ├── base/ # Base interfaces and types
│ │ └── typescript/ # TypeScript serializer
│ ├── steps/ # CLI workflow steps
│ ├── utils/ # Shared utilities
│ └── webflow/ # Webflow API client
└── index.ts # CLI entry point
```

### Key Components

- `Cli`: Main CLI application orchestrator
- `TypeScriptSerializer`: Converts Webflow schemas to TypeScript
- `CollectionReferenceManager`: Handles collection relationships
- `SchemaConverter`: Transforms Webflow fields to type definitions

### Intermediate Schema

The tool stores the raw Webflow collection schemas in an intermediate JSON format that matches (part of) Webflow's Data API response structure for the `/get_collection_details` endpoint. This schema contains detailed field definitions, validations, and metadata for each collection:

```json
{
  "last_synced": "2025-02-24T02:23:16.594Z",
  "schemas": {
    "64d65811b2155c72fcc42990": {
      "name": "Events",
      "fields": [
        {
          "id": "2c97847cdfaf7389d8182475d2663407",
          "isEditable": true,
          "isRequired": false,
          "type": "Reference",
          "slug": "event-venue",
          "displayName": "Event Venue",
          "helpText": "Please select the venue for the event...",
          "validations": {
            "collectionId": "65dcae861710405f6e05b39d"
          }
        },
        {
          "id": "6aaa08785b7583cd94746ca564584341",
          "isEditable": true,
          "isRequired": true,
          "type": "DateTime",
          "slug": "start-date-time",
          "displayName": "Start Date/Time",
          "validations": {
            "format": "date-time"
          }
        }
      ]
    }
  }
}
```

This raw schema format:
- Preserves all field metadata from Webflow (IDs, validation rules, help text)
- Maintains the exact structure from Webflow's API
- Can be used to regenerate types without re-fetching from Webflow
- Serves as the source of truth for all serializers
- Enables detailed type generation with field-level options and validations

The schema is saved to `webflow.schema.json` and can be used independently of the type generation process.

## Contributing

Contributions are welcome! The project is designed to be extensible, particularly in adding new serializers for different type systems or output formats.

### Adding a New Serializer

1. Implement the `Serializer` interface:

```typescript
interface Serializer {
serialize(options: SerializerOptions): Promise<void>;
}
```
2. Add your serializer to the `src/main/serializers` directory
3. Update the CLI to include your new serializer option

## Future Enhancements

- [ ] Convert to npx-runnable CLI executable
  - Enable installation via `npx @webflow/schema-cli`
  - Add configurable output paths via CLI arguments
  - Support for custom configuration files (webflow.config.js)
  - Make paths dynamic and configurable
- [ ] Support for Zod schema generation
- [ ] Support for Python/Pydantic models
- [ ] Automatic schema sync on Webflow collection changes
- [ ] Integration with build tools (webpack, vite, etc.)
- [ ] Support for Webflow E-commerce types
- [ ] Support for Form submission types

## License

MIT

## Acknowledgments

This project was inspired by similar tools in other ecosystems, particularly Supabase's TypeScript integration, which generates type definitions from database schemas.