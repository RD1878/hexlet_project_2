import _ from 'lodash';

const makeQuotes = (value) => {
  if (typeof (value) === 'string') {
    const result = `'${value}'`;
    return result;
  }
  const result = value;
  return result;
};

const add = (element, deep) => {
  if (_.isObject(element.value)) {
    return `\nProperty '${deep}${element.key}' was added with value: [complex value]`;
  }
  return `\nProperty '${deep}${element.key}' was added with value: ${makeQuotes(element.value)}`;
};

const remove = (element, deep) => `\nProperty '${deep}${element.key}' was removed`;

const update = (element, deep) => {
  if (_.isObject(element.oldValue) && !_.isObject(element.newValue)) {
    return `\nProperty '${deep}${element.key}' was updated. From [complex value] to ${makeQuotes(element.newValue)}`;
  }
  if (!_.isObject(element.oldValue) && _.isObject(element.newValue)) {
    return `\nProperty '${deep}${element.key}' was updated. From ${makeQuotes(element.oldValue)} to [complex value]`;
  }
  if (!_.isObject(element.oldValue) && !_.isObject(element.newValue)) {
    return `\nProperty '${deep}${element.key}' was updated. From ${makeQuotes(element.oldValue)} to ${makeQuotes(element.newValue)}`;
  }
  return true;
};

const plainFormat = (tree, deep = '') => tree.reduce((resultString, item) => {
  if (item.type === 'nested') {
    const newDeep = `${deep}${item.key}.`;
    return `${resultString}${plainFormat(item.children, newDeep)}`;
  }
  if (item.type === 'removed') {
    return `${resultString}${remove(item, deep)}`;
  }
  if (item.type === 'add' && !resultString.includes(`Property '${deep}${item.key}' was updated.`)) {
    return `${resultString}${add(item, deep)}`;
  }
  if (item.type === 'changed') {
    return `${resultString}${update(item, deep)}`;
  }
  return resultString;
}, '');

export default plainFormat;
