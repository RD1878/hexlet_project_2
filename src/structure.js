import _ from 'lodash';

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

export default getStructure;
