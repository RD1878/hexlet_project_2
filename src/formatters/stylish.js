import _ from 'lodash';

const getSpaces = (repeatCount) => '  '.repeat(repeatCount);

const getFormattedValue = (data, spaceCount) => {
  if (_.isObject(data)) {
    const entries = Object.entries(data);
    return entries.map(([key, value]) => `{\n${getSpaces(spaceCount + 1)}    ${key}: ${getFormattedValue(value)}\n${getSpaces(spaceCount + 1)}}`);
  }
  return data;
};

const makeStylish = (tree) => {
  const renderResult = (nodes, spaceCount) => {
    const result = nodes.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${getSpaces(spaceCount)}  ${item.key}: ${renderResult(item.children, spaceCount + 2)}`;
        case 'removed':
          return `${getSpaces(spaceCount)}- ${item.key}: ${getFormattedValue(item.oldValue, spaceCount)}`;
        case 'add':
          return `${getSpaces(spaceCount)}+ ${item.key}: ${getFormattedValue(item.newValue, spaceCount)}`;
        case 'changed':
          return [
            `${getSpaces(spaceCount)}- ${item.key}: ${getFormattedValue(item.oldValue, spaceCount)}`,
            `${getSpaces(spaceCount)}+ ${item.key}: ${getFormattedValue(item.newValue, spaceCount)}`,
          ];
        case 'unchanged':
          return `${getSpaces(spaceCount)}  ${item.key}: ${getFormattedValue(item.value, spaceCount)}`;
        default:
          throw new Error(`Error! Item type ${item.type} is incorrect!`);
      }
    }).join('\n');
    return `{\n${result}\n${getSpaces(spaceCount - 1)}}`;
  };
  return renderResult(tree, 1);
};

export default makeStylish;
