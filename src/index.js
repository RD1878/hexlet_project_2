import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

export default (pathToFile1, pathToFile2) => {
  const firstFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), pathToFile1), 'utf8'));
  const secondFile = JSON.parse(fs.readFileSync((path.resolve(process.cwd(), pathToFile2)), 'utf8'));
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
