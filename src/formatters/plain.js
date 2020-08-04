const getFormattedValue = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return value;
};

const getPropertyName = (paths, key) => [...paths, key].join('.');

const makePlain = (tree) => {
  const renderResult = (nodes, paths) => {
    const result = nodes
      .flatMap((item) => {
        switch (item.type) {
          case 'nested':
            return renderResult(item.children, [...paths, item.key]);
          case 'removed':
            return `Property '${getPropertyName(paths, item.key)}' was removed`;
          case 'add':
            return `Property '${getPropertyName(paths, item.key)}' was added with value: ${getFormattedValue(item.newValue)}`;
          case 'changed':
            return `Property '${getPropertyName(paths, item.key)}' was updated. From ${getFormattedValue(item.oldValue)} to ${getFormattedValue(item.newValue)}`;
          case 'unchanged':
            return [];
          default:
            throw new Error(`Error! Item type ${item.type} is incorrect!`);
        }
      })
      .join('\n');
    return result;
  };
  return renderResult(tree, []);
};

export default makePlain;
