import _ from 'lodash';

const getTree = (firstObject, secondObject) => {
  const uniqKeys = _.union(_.keys(firstObject), _.keys(secondObject));
  return uniqKeys.map((key) => {
    if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      return {
        key,
        children: getTree(firstObject[key], secondObject[key]),
        type: 'nested',
      };
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      return {
        key,
        value: firstObject[key],
        type: 'removed',
      };
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      return {
        key,
        value: secondObject[key],
        type: 'add',
      };
    }
    if (firstObject[key] === secondObject[key]) {
      return {
        key,
        value: firstObject[key],
        type: 'unchanged',
      };
    }
    if (!_.isObject(firstObject[key]) || !_.isObject(secondObject[key])) {
      return {
        key,
        oldValue: firstObject[key],
        newValue: secondObject[key],
        type: 'changed',
      };
    }
    return true;
  });
};

export default getTree;
