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
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2, program.format));
  })
  .parse(process.argv);
