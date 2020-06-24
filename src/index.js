import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import { parserJson, parserYaml, parserIni } from './parsers.js';

export default (pathToFile1, pathToFile2) => {
  let firstFile;
  let secondFile;
  if (path.extname(pathToFile1) === '.json' && path.extname(pathToFile2) === '.json') {
    firstFile = parserJson(fs.readFileSync(path.resolve(process.cwd(), pathToFile1), 'utf8'));
    secondFile = parserJson(fs.readFileSync((path.resolve(process.cwd(), pathToFile2)), 'utf8'));
  } else if (path.extname(pathToFile1) === '.yml' && path.extname(pathToFile2) === '.yml') {
    firstFile = parserYaml(fs.readFileSync(path.resolve(process.cwd(), pathToFile1), 'utf8'));
    secondFile = parserYaml(fs.readFileSync((path.resolve(process.cwd(), pathToFile2)), 'utf8'));
  } else if (path.extname(pathToFile1) === '.ini' && path.extname(pathToFile2) === '.ini') {
    firstFile = parserYaml(fs.readFileSync(path.resolve(process.cwd(), pathToFile1), 'utf8'));
    secondFile = parserYaml(fs.readFileSync((path.resolve(process.cwd(), pathToFile2)), 'utf8'));
  } else {
    console.log("Incorrect or different file extension. Try again by specifying the extensions of the two files ('.json', '.yml', '.ini').");
    return;
  }
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);
  const uniqKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  let result = '{';
  uniqKeys.forEach((key) => {
    if (_.has(firstFile, key) && _.has(secondFile, key)) {
      if (firstFile[key] === secondFile[key]) {
        result += `\n    ${key}: ${firstFile[key]}`;
      } else {
        result += `\n  - ${key}: ${firstFile[key]}`;
        result += `\n  + ${key}: ${secondFile[key]}`;
      }
    }
    if (_.has(firstFile, key) && !_.has(secondFile, key)) {
      result += `\n  - ${key}: ${firstFile[key]}`;
    }
    if (!_.has(firstFile, key) && _.has(secondFile, key)) {
      result += `\n  + ${key}: ${secondFile[key]}`;
    }
  });
  result += '\n}';
  console.log(result);
  return result;
};
