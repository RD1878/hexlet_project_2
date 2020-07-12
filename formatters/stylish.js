import _ from 'lodash';

const getSymbol = (type) => {
  if (type === 'add') {
    return '+ ';
  }
  if (type === 'rm') {
    return '- ';
  }
  if (type === 'none') {
    return '  ';
  }
  return true;
};

const stylishFormat = (tree, spaceCount = 1) => {
  const objectEntries = (object) => {
    const entries = Object.entries(object);
    return entries.reduce((acc, [key, value]) => acc + `    ${key}: ${value}`, '');
  };
  const spaceString = (repeatCount) => '  '.repeat(repeatCount);
  return tree.reduce((resultString, item) => {
    if (Array.isArray(item.value)) {
      return resultString + `\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: {${stylishFormat(item.value, spaceCount + 2)}\n${spaceString(spaceCount + 1)}}`;
    }
    if (_.isObject(item.value)) {
      return resultString + `\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: {\n${spaceString(spaceCount + 1)}${(objectEntries(item.value))}\n${spaceString(spaceCount + 1)}}`;
    }
    if (!Array.isArray(item.value) && !_.isObject(item.value)) {
      return resultString + `\n${spaceString(spaceCount)}${getSymbol(item.type)}${item.key}: ${item.value}`;
    }
    return true;
  }, '');
};

export default stylishFormat;
