import _ from 'lodash';

const getSymbol = (type) => {
  if (type === 'add') {
    return '+ ';
  }
  if (type === 'removed') {
    return '- ';
  }
  if (type === 'unchanged' || type === 'nested') {
    return '  ';
  }
  return {
    old: getSymbol('removed'),
    new: getSymbol('add'),
  };
};

const makeStylish = (tree, spaceCount = 1) => {
  const spaceString = (repeatCount) => '  '.repeat(repeatCount);
  const getValueItem = (data) => {
    if (_.isObject(data)) {
      const entries = Object.entries(data);
      return entries.reduce((acc, [key, value]) => `{\n${spaceString(spaceCount + 1)}${acc}    ${key}: ${value}\n${spaceString(spaceCount + 1)}}`, '');
    }
    return data;
  };
  const result = tree.reduce((resultString, item) => {
    if (item.type === 'nested') {
      return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${makeStylish(item.children, spaceCount + 2)}`;
    }
    if (item.type === 'changed') {
      return `${resultString}\n${spaceString(spaceCount)}${(getSymbol(item.type).old)}${item.key}: ${getValueItem(item.oldValue)}\n${spaceString(spaceCount)}${(getSymbol(item.type).new)}${item.key}: ${getValueItem(item.newValue)}`;
    }
    if (item.type === 'add') {
      return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.newValue)}`;
    }
    if (item.type === 'removed') {
      return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.oldValue)}`;
    }
    return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.value)}`;
  }, '');
  return `{${result}\n${spaceString(spaceCount - 1)}}`;
};

export default makeStylish;
