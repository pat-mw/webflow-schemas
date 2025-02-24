/*
This CLI tool is used to fetch dynamic schemas from Webflows Data API.
*/

import chalk from 'chalk';
import { Env } from './env';
import { WebflowClient } from './webflow/client';
import { showSuccess, showInfo } from './utils/cli-utils';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs/promises';
import { StepContext } from './steps/base';
import { InitializeStep } from './steps/initialize';
import { SelectSiteStep } from './steps/select-site';
import { SelectCollectionsStep } from './steps/select-collections';
import { FetchSchemaStep } from './steps/fetch-schema';
import { GenerateTypesStep } from './steps/generate-types';
import figlet from 'figlet';
import { pastel } from 'gradient-string';

export class Cli {
  private context: StepContext;

  constructor(private env: Env) {
    this.context = {
      env: this.env,
    } as StepContext;
  }

  private async shouldResyncSchema(): Promise<boolean> {
    const schemaPath = path.join(process.cwd(), 'out', 'webflow.schema.json');

    try {
      const fileContent = await fs.readFile(schemaPath, 'utf-8');
      const schema = JSON.parse(fileContent);
      const lastSynced = new Date(schema.last_synced);
      const daysSinceSync = Math.floor((Date.now() - lastSynced.getTime()) / (1000 * 60 * 60 * 24));

      showInfo(`Found existing schema last synced ${daysSinceSync} days ago`);

      const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'resync',
        message: `Would you like to re-sync from Webflow API?`,
        default: daysSinceSync > 7,
      });

      return answer.resync;
    } catch (error) {
      showInfo('No existing schema found - will fetch from Webflow API');
      return true;
    }
  }

  private async syncSchema(): Promise<void> {
    const steps = [new InitializeStep(), new SelectSiteStep(), new SelectCollectionsStep(), new FetchSchemaStep()];

    for (const step of steps) {
      await step.execute(this.context);
    }

    showSuccess('Schema sync completed successfully');
  }

  private async generateTypes(): Promise<void> {
    showInfo('Generating TypeScript types from schema...');
    const generateStep = new GenerateTypesStep();
    await generateStep.execute(this.context);
  }

  async run() {
    figlet('WEBFLOW SCHEMAS', (err, data) => {
      console.log(pastel.multiline(data ?? ''));
    });

    const shouldSync = await this.shouldResyncSchema();

    if (shouldSync) {
      await this.syncSchema();
    } else {
      showSuccess('Using existing schema file');
    }

    // Always generate types regardless of schema sync
    await this.generateTypes();
  }
}
