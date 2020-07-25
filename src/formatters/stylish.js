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
  if (type === 'changed') {
    return {
      old: getSymbol('removed'),
      new: getSymbol('add'),
    };
  }
  return true;
};

const stylishFormat = (tree, spaceCount = 1) => {
  const spaceString = (repeatCount) => '  '.repeat(repeatCount);
  const getValueItem = (data) => {
    if (_.isObject(data)) {
      const entries = Object.entries(data);
      return entries.reduce((acc, [key, value]) => `{\n${spaceString(spaceCount + 1)}${acc}    ${key}: ${value}\n${spaceString(spaceCount + 1)}}`, '');
    }
    return data;
  };
  return tree.reduce((resultString, item) => {
    if (item.type === 'nested') {
      return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: {${stylishFormat(item.children, spaceCount + 2)}\n${spaceString(spaceCount + 1)}}`;
    }
    if (item.type === 'changed') {
      return `${resultString}\n${spaceString(spaceCount)}${(getSymbol(item.type).old)}${item.key}: ${getValueItem(item.oldValue)}\n${spaceString(spaceCount)}${(getSymbol(item.type).new)}${item.key}: ${getValueItem(item.newValue)}`;
    }
    if (item.type === 'add' || item.type === 'removed' || item.type === 'unchanged') {
      return `${resultString}\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${getValueItem(item.value)}`;
    }
    return true;
  }, '');
};

export default stylishFormat;
