/*
This CLI tool is used to fetch dynamic schemas from Webflows Data API.
*/

import chalk from 'chalk';
import { Env } from "./env";
import { createClient, type WebflowClient } from "./webflow/client";
import { showSpinner, selectSite, showError, showSuccess, selectCollections } from './utils/cli-utils';
import { type Collection } from 'webflow-api/api';

export class Cli {
    private webflow!: WebflowClient;
    private siteId?: string;
    private selectedCollections: string[] = [];

    constructor(private env: Env) {
        this.env = env;
    }

    private async initialize() {
      // Initialize the webflow client
        this.webflow = await createClient(this.env.WEBFLOW_ACCESS_TOKEN);
    }

    private async initializeSite(): Promise<void> {
        try {
            // If site ID is provided in env, use it
            if (this.env.WEBFLOW_SITE_ID) {
                this.siteId = this.env.WEBFLOW_SITE_ID;
                showSuccess(`Using site ID from environment: ${this.siteId}`);
                return;
            }

            // Otherwise, fetch available sites
            const spinner = await showSpinner('Fetching available sites...');
            const result = await this.webflow.sites.list();
            if (result.sites === undefined || result.sites.length === 0) {
                throw new Error('No sites found in your account. Are you using the correct access token?');
            }

            spinner.success({ text: 'Sites fetched successfully' });

            // Let user select a site
            this.siteId = await selectSite(result.sites);
            
            showSuccess(`Selected site: ${this.siteId}`);
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }

    private async fetchAndSelectCollections(): Promise<void> {
        try {
            const spinner = await showSpinner('Fetching collections...');
            
            if (!this.siteId) {
                throw new Error('Site ID not initialized');
            }

            const response = await this.webflow.collections.list(this.siteId);
            const collections = response.collections as Collection[];
            
            if (!collections || collections.length === 0) {
                throw new Error('No collections found in this site');
            }

            spinner.success({ text: `Found ${collections.length} collections` });

            // Let user select collections
            const selectedCollections = await selectCollections(collections);
            
            if (selectedCollections.length === 0) {
                throw new Error('No collections selected');
            }

            showSuccess(`Selected ${selectedCollections.length} collections to sync`);
            
            // Store selected collections for later use
            this.selectedCollections = selectedCollections;
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }

    async run() {
        console.log(chalk.blue('\n🌊 Webflow Schema Fetcher\n'));
        await this.initialize();
        await this.initializeSite();
        await this.fetchAndSelectCollections();
        
        // More functionality will be added here
        showSuccess('CLI initialized successfully');
    }
}

