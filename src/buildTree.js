import _ from 'lodash';

const buildTree = (firstObject, secondObject) => {
  const uniqKeys = _.union(_.keys(firstObject), _.keys(secondObject));
  return uniqKeys.map((key) => {
    if (!_.has(secondObject, key)) {
      return {
        key,
        oldValue: firstObject[key],
        type: 'removed',
      };
    }
    if (!_.has(firstObject, key)) {
      return {
        key,
        newValue: secondObject[key],
        type: 'add',
      };
    }
    if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
      return {
        key,
        children: buildTree(firstObject[key], secondObject[key]),
        type: 'nested',
      };
    }
    if (firstObject[key] !== secondObject[key]) {
      return {
        key,
        oldValue: firstObject[key],
        newValue: secondObject[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: firstObject[key],
      type: 'unchanged',
    };
  });
};

export default buildTree;
