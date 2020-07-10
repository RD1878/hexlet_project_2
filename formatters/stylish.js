import _ from 'lodash';

const stylishFormat = (tree, spaceCount = 1) => {
  const objectEntries = (object) => {
    let result = '';
    const entries = Object.entries(object);
    entries.forEach(([key, value]) => {
      result += `    ${key}: ${value}`;
    });
    return result;
  };
  let resultString = '';
  const spaceString = (repeatCount) => '  '.repeat(repeatCount);
  tree.forEach((item) => {
    if (Array.isArray(item.value)) {
      resultString += `\n${spaceString(spaceCount)}${item.type}${item.key}: {${stylishFormat(item.value, spaceCount + 2)}\n${spaceString(spaceCount + 1)}}`;
    } else {
      if (_.isObject(item.value)) {
        resultString += `\n${spaceString(spaceCount)}${item.type}${item.key}: {\n${spaceString(spaceCount + 1)}${(objectEntries(item.value))}\n${spaceString(spaceCount + 1)}}`;
      }
      if (!Array.isArray(item.value) && !_.isObject(item.value)) {
        resultString += `\n${spaceString(spaceCount)}${item.type}${item.key}: ${item.value}`;
      }
    }
  });
  return resultString;
};

export default stylishFormat;
