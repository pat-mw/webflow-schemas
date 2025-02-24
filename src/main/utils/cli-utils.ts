import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { type Site, type Collection } from 'webflow-api/api';

export const sleep = (ms = 2000): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export async function showSpinner(message: string): Promise<any> {
  const spinner = createSpinner(message).start();
  return spinner;
}

export async function selectSite(sites: Site[]) {
  const choices = sites.map(site => ({
    name: `${site.displayName} (${site.customDomains?.filter(domain => domain.url?.startsWith('www')).map(domain => domain.url).join(', ') ?? site.previewUrl ?? 'No domain linked'})`,
    value: site.id
  }));

  const answer = await inquirer.prompt({
    name: 'siteId',
    type: 'list',
    message: 'Select a site:',
    choices
  });

  return answer.siteId;
}

export function showError(message: string) {
  console.error(chalk.red(`Error: ${message}`));
}

export function showSuccess(message: string) {
  console.log(chalk.green(`✓ ${message}`));
}

export function showInfo(message: string) {
  console.log(chalk.blue(`ℹ ${message}`));
}

export async function selectCollections(collections: Collection[]) {
  const choices = collections.map(collection => ({
    name: `${collection.displayName} (/${collection.slug})`,
    value: collection.id,
    checked: true
  }));

  const answer = await inquirer.prompt({
    name: 'selectedCollections',
    type: 'checkbox',
    message: 'Select collections to sync (all selected by default):',
    choices,
    default: choices.map(c => c.value)
  });

  return answer.selectedCollections;
} 