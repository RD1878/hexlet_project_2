#!/usr/bin/env node
import commander from 'commander';
import process from 'process';
import genDiff from '../src/index.js';

const program = commander;
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse(process.argv);

const args = process.argv;
const path1 = args[2];
const path2 = args[3];
const format = args[5];
genDiff(path1, path2, format);
