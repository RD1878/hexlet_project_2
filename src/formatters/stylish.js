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
  const result = tree.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${makeStylish(item.children, spaceCount + 2)}`;
      case 'removed':
        return `${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.oldValue)}`;
      case 'add':
        return `${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.newValue)}`;
      case 'changed':
        return `${spaceString(spaceCount)}${(getSymbol(item.type).old)}${item.key}: ${getValueItem(item.oldValue)}\n${spaceString(spaceCount)}${(getSymbol(item.type).new)}${item.key}: ${getValueItem(item.newValue)}`;
      default:
        return `${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.value)}`;
    }
  }).join('\n');
  return `{\n${result}\n${spaceString(spaceCount - 1)}}`;
};

export default makeStylish;
