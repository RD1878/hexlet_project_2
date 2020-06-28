import _ from 'lodash';
import parser from './parsers.js';

const difference = (pathToFile1, pathToFile2) => {
  const firstFile = parser(pathToFile1);
  const secondFile = parser(pathToFile2);
  const firstFileKeys = Object.keys(parser(pathToFile1));
  const secondFileKeys = Object.keys(parser(pathToFile2));
  const uniqKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  let result = '{';
  uniqKeys.forEach((key) => {
    if (!(_.isObject(firstFile[key]))) {
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
    }
  });
  result += '\n}';
  console.log(result);
  return result;
};

export default difference;
