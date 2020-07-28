import _ from 'lodash';

const buildTree = (firstObject, secondObject) => {
  const uniqKeys = _.union(_.keys(firstObject), _.keys(secondObject));
  return uniqKeys.map((key) => {
    if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      return {
        key,
        children: buildTree(firstObject[key], secondObject[key]),
        type: 'nested',
      };
    }
    if (_.has(firstObject, key) && !_.has(secondObject, key)) {
      return {
        key,
        oldValue: firstObject[key],
        type: 'removed',
      };
    }
    if (!_.has(firstObject, key) && _.has(secondObject, key)) {
      return {
        key,
        newValue: secondObject[key],
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
    return {
      key,
      oldValue: firstObject[key],
      newValue: secondObject[key],
      type: 'changed',
    };
  });
};

export default buildTree;
