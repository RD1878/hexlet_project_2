import _ from 'lodash';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

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
          type: '  ',
        });
      } else {
        if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
          result.push({
            key,
            value: getStructure(firstObject[key], secondObject[key]),
            type: '  ',
          });
        }
        if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
          result.push({
            key,
            value: firstObject[key],
            type: '- ',
          });
          result.push({
            key,
            value: secondObject[key],
            type: '+ ',
          });
        }
      }
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result.push({
        key,
        value: firstObject[key],
        type: '- ',
      });
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result.push({
        key,
        value: secondObject[key],
        type: '+ ',
      });
    }
  });
  return result;
};

const getDifference = (pathToFile1, pathToFile2, format) => {
  const firstFile = parser(pathToFile1);
  const secondFile = parser(pathToFile2);
  const structure = getStructure(firstFile, secondFile);
  const result = formatter(structure, format);
  console.log(result);
  return result;
};

export default getDifference;
