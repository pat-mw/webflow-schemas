#!/usr/bin/env node
import { program } from 'commander';
import { orderPizza } from './index';
import * as fs from 'fs';
import * as path from 'path';

interface Options {
  small?: boolean;
  pizzaType: string;
}

program
  .version(JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf-8' })).version)
  .option('-s, --small', 'small pizza size')
  .requiredOption('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

const options = program.opts() as Options;

orderPizza(options.small, options.pizzaType).then(console.log);