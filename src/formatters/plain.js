const makeQuotes = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return value;
};

const add = (element, deep) => `Property '${deep}${element.key}' was added with value: ${makeQuotes(element.newValue)}`;
const remove = (element, deep) => `Property '${deep}${element.key}' was removed`;
const update = (element, deep) => `Property '${deep}${element.key}' was updated. From ${makeQuotes(element.oldValue)} to ${makeQuotes(element.newValue)}`;

const plainFormat = (tree, deep = '') => {
  const result = tree
    .map((item) => {
      switch (item.type) {
        case 'nested':
          return plainFormat(item.children, `${deep}${item.key}.`);
        case 'removed':
          return remove(item, deep);
        case 'add':
          return add(item, deep);
        case 'changed':
          return update(item, deep);
        default:
          return null;
      }
    })
    .filter((item) => item !== null)
    .join('\n');
  return result;
};

export default plainFormat;
