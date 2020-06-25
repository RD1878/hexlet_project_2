import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import { parserJson, parserYaml, parserIni } from './parsers.js';

export default (pathToFile1, pathToFile2) => {
  let firstFile;
  let secondFile;
  const fileValue = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  if (path.extname(pathToFile1) === '.json' && path.extname(pathToFile2) === '.json') {
    firstFile = parserJson(fileValue(pathToFile1));
    secondFile = parserJson(fileValue(pathToFile2));
  }
  if (path.extname(pathToFile1) === '.yml' && path.extname(pathToFile2) === '.yml') {
    firstFile = parserYaml(fileValue(pathToFile1));
    secondFile = parserYaml(fileValue(pathToFile2));
  }
  if (path.extname(pathToFile1) === '.ini' && path.extname(pathToFile2) === '.ini') {
    firstFile = parserIni(fileValue(pathToFile1));
    secondFile = parserIni(fileValue(pathToFile2));
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
