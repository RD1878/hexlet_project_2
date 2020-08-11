import _ from 'lodash';

const indent = '  ';
const getIndent = (repeatCount) => indent.repeat(repeatCount);

const getFormattedValue = (data, spaceCount) => {
  if (!_.isObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  return entries.map(([key, value]) => `{\n${getIndent(spaceCount + 1)}    ${key}: ${getFormattedValue(value)}\n${getIndent(spaceCount + 1)}}`);
};

const makeStylish = (tree) => {
  const renderResult = (nodes, spaceCount) => {
    const result = nodes.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${getIndent(spaceCount)}  ${item.key}: ${renderResult(item.children, spaceCount + 2)}`;
        case 'removed':
          return `${getIndent(spaceCount)}- ${item.key}: ${getFormattedValue(item.oldValue, spaceCount)}`;
        case 'add':
          return `${getIndent(spaceCount)}+ ${item.key}: ${getFormattedValue(item.newValue, spaceCount)}`;
        case 'changed':
          return [
            `${getIndent(spaceCount)}- ${item.key}: ${getFormattedValue(item.oldValue, spaceCount)}`,
            `${getIndent(spaceCount)}+ ${item.key}: ${getFormattedValue(item.newValue, spaceCount)}`,
          ];
        case 'unchanged':
          return `${getIndent(spaceCount)}  ${item.key}: ${getFormattedValue(item.value, spaceCount)}`;
        default:
          throw new Error(`Error! Item type ${item.type} is incorrect!`);
      }
    }).join('\n');
    return `{\n${result}\n${getIndent(spaceCount - 1)}}`;
  };
  return renderResult(tree, 1);
};

export default makeStylish;
