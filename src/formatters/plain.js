import _ from 'lodash';

const makeQuotes = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'object') {
    return '[complex value]';
  }
  return value;
};

const add = (element, deep) => `\nProperty '${deep}${element.key}' was added with value: ${makeQuotes(element.newValue)}`;
const remove = (element, deep) => `\nProperty '${deep}${element.key}' was removed.`;
const update = (element, deep) => `\nProperty '${deep}${element.key}' was updated. From ${makeQuotes(element.oldValue)} to ${makeQuotes(element.newValue)}`;

const plainFormat = (tree, deep = '') => tree.reduce((resultString, item) => {
  switch (item.type) {
    case 'nested':
      return `${resultString}${plainFormat(item.children, `${deep}${item.key}.`)}`;
    case 'removed':
      return `${resultString}${remove(item, deep)}`;
    case 'add':
      return `${resultString}${add(item, deep)}`;
    case 'changed':
      return `${resultString}${update(item, deep)}`;
    default:
      return resultString;
  }
}, '');

export default plainFormat;
