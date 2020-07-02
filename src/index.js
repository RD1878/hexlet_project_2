import _ from 'lodash';
import parser from './parsers.js';

const func = (firstObject, secondObject) => {
  const firstFileKeys = Object.keys(firstObject);
  const secondFileKeys = Object.keys(secondObject);
  const uniqKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  const result = [];
  uniqKeys.map((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        result.push({ [`  ${key}`]: firstObject[key] });
      } else {
        if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
          const newValue = func(firstObject[key], secondObject[key]);
          result.push({ [`  ${key}`]: newValue });
        }
        if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
          result.push({ [`- ${key}`]: firstObject[key] });
          result.push({ [`+ ${key}`]: secondObject[key] });
        }
      }
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result.push({ [`- ${key}`]: firstObject[key] });
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result.push({ [`+ ${key}`]: secondObject[key] });
    }
  });
  return result;
};

const foo = (tree) => {
 console.log(tree);
};

const getDifference = (pathToFile1, pathToFile2) => {
  const firstFile = parser(pathToFile1);
  const secondFile = parser(pathToFile2);
  const result = func(firstFile, secondFile);
  /* console.log(result[1]['  group1'][3]['- nest'][0]['key']); */
  const diff = foo(result);
  console.log(diff);
  return diff;
};

export default getDifference;

/* uniqKeys.forEach((key) => {
    if (_.has(firstObject, key) && _.has(secondObject, key)) {
      if (firstObject[key] === secondObject[key]) {
        result += `${key}: ${firstObject[key]}`;
      } else {
        if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
          result += `\n    ${key}: {\n  ${func(firstObject[key], secondObject[key])}\n}`;
        }
        if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
          result += `\n  - ${key}: ${JSON.stringify(firstObject[key])}`;
          result += `\n  + ${key}: ${JSON.stringify(secondObject[key])}`;
        }
      }
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      result += `\n- ${key}: ${JSON.stringify(firstObject[key])}`;
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      result += `\n+ ${key}: ${JSON.stringify(secondObject[key])}`;
    }
  }); */
