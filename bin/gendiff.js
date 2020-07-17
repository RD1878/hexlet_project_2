#!/usr/bin/env node
import commander from 'commander';
import process from 'process';
import genDiff from '../src/index.js';

const program = commander;
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<pathToFile1> <pathToFile2>')
  .action(() => {
    console.log(genDiff(program.args[0], program.args[1], program.format));
  })
  .parse(process.argv);
