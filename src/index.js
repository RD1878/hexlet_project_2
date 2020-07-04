import _ from 'lodash';
import parser from './parsers.js';

const getStructure = (firstObject, secondObject) => {
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const uniqKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  const result = [];
  uniqKeys.forEach((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        result.push({
          key,
          value: firstObject[key],
          type: ' ',
        });
      } else {
        if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
          result.push({
            key,
            value: getStructure(firstObject[key], secondObject[key]),
            type: ' ',
          });
        }
        if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
          result.push({
            key,
            value: firstObject[key],
            type: '-',
          });
          result.push({
            key,
            value: secondObject[key],
            type: '+',
          });
        }
      }
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result.push({
        key,
        value: firstObject[key],
        type: '-',
      });
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result.push({
        key,
        value: secondObject[key],
        type: '+',
      });
    }
  });
  return result;
};
let resultString = '';

const res = (obj) => {
  let result = '';
  const entries = Object.entries(obj);
  entries.forEach(([key, value]) => {
    result += `${key}: ${value}`;
  });
  return result;
};

const difference = (tree) => {
  /* console.log(tree[0].value[4]); */
  tree.forEach((item) => {
    if (Array.isArray(item.value)) {
      resultString += `\n  ${item.type} ${item.key}: {${difference(item.value)}\n    }`;
    }
    if (!Array.isArray(item.value)) {
      if (_.isObject(item.value)) {
        resultString += `\n      ${item.type} ${item.key}: {\n            ${(res(item.value))}\n        }`;
      } else {
        resultString += `\n      ${item.type} ${item.key}: ${item.value}`;
      }
    }
  });
  return resultString;
};

const getDifference = (pathToFile1, pathToFile2) => {
  const firstFile = parser(pathToFile1);
  const secondFile = parser(pathToFile2);
  const result = getStructure(firstFile, secondFile);
  const diff = difference(result);
  console.log(diff);
  return diff;
};

export default getDifference;
