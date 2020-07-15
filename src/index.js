import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

const numParser = (tree) => {
  tree.forEach((item) => {
    if (Array.isArray(item.value)) {
      numParser(item.value);
    }
    if (typeof (item.value) === 'string') {
      const num = Number(item.value);
      item.value = isNaN(num) ? item.value : num;
    }
    if (_.isObject(item.value)) {
      const object = item.value;
      const entries = Object.entries(object);
      entries.forEach(([key, val]) => {
        if (typeof (val) === 'string') {
          const num = Number(val);
          object[key] = isNaN(num) ? object[key] : num;
        }
      });
    }
  });
  return tree;
};

const getStructure = (firstObject, secondObject) => {
  if (!_.isObject(firstObject) || !_.isObject(secondObject)) {
    throw new Error('One or both files are incorrect');
  } else {
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
            type: 'none',
          });
        } else {
          if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
            result.push({
              key,
              value: getStructure(firstObject[key], secondObject[key]),
              type: 'none',
            });
          }
          if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
            result.push({
              key,
              value: firstObject[key],
              type: 'rm',
            });
            result.push({
              key,
              value: secondObject[key],
              type: 'add',
            });
          }
        }
      }
      if (_.has(firstObject, key) && !_.has(secondObject, key)) {
        result.push({
          key,
          value: firstObject[key],
          type: 'rm',
        });
      }
      if (!_.has(firstObject, key) && _.has(secondObject, key)) {
        result.push({
          key,
          value: secondObject[key],
          type: 'add',
        });
      }
    });
    return result;
  }
};

const getDifference = (pathToFile1, pathToFile2, format) => {
  const firstFile = parser(pathToFile1);
  const secondFile = parser(pathToFile2);
  const structure = getStructure(firstFile, secondFile);
  const newStr = numParser(structure);
  const result = formatter(newStr, format);
  console.log(result);
  return result;
};

export default getDifference;
