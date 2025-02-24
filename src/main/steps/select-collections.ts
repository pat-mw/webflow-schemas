import { Step, StepContext } from "./base";
import { showSpinner, selectCollections, showSuccess, showError } from '@/main/utils/cli-utils';
import { Collection } from "@/main/webflow/client";

export class SelectCollectionsStep implements Step {
    async execute(context: StepContext): Promise<void> {
        try {
            const spinner = await showSpinner('Fetching collections...');
            
            if (!context.siteId) {
                throw new Error('Site ID not initialized');
            }

            const response = await context.webflow.collections.list(context.siteId);
            const collections = response.collections as Collection[];
            
            if (!collections || collections.length === 0) {
                throw new Error('No collections found in this site');
            }

            spinner.success({ text: `Found ${collections.length} collections` });
            const selectedCollections = await selectCollections(collections);
            
            if (!selectedCollections || selectedCollections.length === 0) {
                throw new Error('No collections selected');
            }

            showSuccess(`Selected ${selectedCollections.length} collections to sync`);
            context.selectedCollections = selectedCollections;
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            throw error; // Always throw in both test and production
        }
    }
} 