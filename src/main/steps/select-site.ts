import { Step, StepContext } from "./base";
import { showSpinner, selectSite, showSuccess, showError } from '@/main/utils/cli-utils';

export class SelectSiteStep implements Step {
    async execute(context: StepContext): Promise<void> {
        try {
            if (context.env.WEBFLOW_SITE_ID) {
                context.siteId = context.env.WEBFLOW_SITE_ID;
                showSuccess(`Using site ID from environment: ${context.siteId}`);
                return;
            }

            const spinner = await showSpinner('Fetching available sites...');
            const result = await context.webflow.sites.list();
            if (result.sites === undefined || result.sites.length === 0) {
                throw new Error('No sites found in your account. Are you using the correct access token?');
            }

            spinner.success({ text: 'Sites fetched successfully' });
            context.siteId = await selectSite(result.sites);
            showSuccess(`Selected site: ${context.siteId}`);
        } catch (error) {
            showError(error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    }
} 