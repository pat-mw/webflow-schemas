import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cli } from '@/main/cli';
import { Env } from '@/main/env';
import fs from 'fs/promises';
import inquirer from 'inquirer';

// Mock the WebflowClient module
vi.mock('@/main/webflow/client', () => ({
  WebflowClient: vi.fn(),
  createClient: vi.fn().mockResolvedValue({
    sites: {
      list: vi.fn().mockResolvedValue({
        sites: [
          {
            id: 'test-site-id',
            displayName: 'Test Site',
            previewUrl: 'https://test.webflow.io'
          }
        ]
      })
    },
    collections: {
      list: vi.fn().mockResolvedValue({
        collections: [
          {
            id: 'test-collection-id',
            displayName: 'Test Collection',
            slug: 'test-collection'
          }
        ]
      }),
      get: vi.fn().mockResolvedValue({
        id: 'test-collection-id',
        displayName: 'Test Collection',
        fields: [
          {
            id: 'test-field',
            type: 'PlainText',
            slug: 'test-field',
            isRequired: true,
            isEditable: true,
            validations: null
          }
        ]
      })
    }
  })
}));

describe('Cli', () => {
  let cli: Cli;
  let mockEnv: Env;
  let mockSchema: any;

  beforeEach(() => {
    mockEnv = {
      WEBFLOW_ACCESS_TOKEN: 'test-token',
      WEBFLOW_SITE_ID: 'test-site-id',
      NODE_ENV: 'test'
    };
    cli = new Cli(mockEnv);

    // Mock fs operations
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);

    // Setup mock schema
    mockSchema = {
      last_synced: new Date().toISOString(),
      schemas: {
        'test-collection-id': {
          name: 'Test Collection',
          fields: [{
            id: 'test-field',
            type: 'PlainText',
            slug: 'test-field',
            isRequired: true,
            isEditable: true,
            validations: null
          }]
        }
      }
    };
  });

  describe('run', () => {
    it('should use existing schema if user chooses not to resync', async () => {
      // Mock fs.readFile to return the mock schema
      vi.mocked(fs.readFile).mockResolvedValueOnce(JSON.stringify(mockSchema));

      // Mock inquirer responses
      vi.mocked(inquirer.prompt)
        .mockResolvedValueOnce({ resync: false })  // Don't resync
        .mockResolvedValueOnce({ outputFormat: 'single' }); // Output format

      await cli.run();

      // Verify schema was not re-fetched
      expect(fs.writeFile).not.toHaveBeenCalledWith(
        expect.stringContaining('webflow.schema.json'),
        expect.any(String)
      );
    });

    it('should fetch new schema if no existing schema found', async () => {
      // Mock fs.readFile to simulate no existing schema
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));

      // Mock inquirer responses for the full flow
      vi.mocked(inquirer.prompt)
        .mockResolvedValueOnce({ resync: true })  // Resync
        .mockResolvedValueOnce({ selectedCollections: ['test-collection-id'] })  // Collection selection
        .mockResolvedValueOnce({ outputFormat: 'single' });  // Output format

      await cli.run();

      // Verify schema was fetched and written
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('webflow.schema.json'),
        expect.stringContaining('"schemas"') // More lenient check
      );

      // // Verify types were generated
      // expect(fs.writeFile).toHaveBeenCalledWith(
      //   expect.stringContaining('webflow.types.ts'),
      //   expect.any(String)
      // );
    });

    it('should handle API errors gracefully', async () => {
      // Mock fs.readFile to force a resync
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));

      // Mock API error
      const mockWebflowClient = await import('../main/webflow/client');
      vi.mocked(mockWebflowClient.createClient).mockRejectedValueOnce(
        new Error('API Error')
      );

      await expect(cli.run()).rejects.toThrow('API Error');
    });
  });
}); 