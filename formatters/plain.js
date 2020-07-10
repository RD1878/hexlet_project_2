import _ from 'lodash';

const isQuotes = (value) => {
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
  return `\nProperty '${deep}${element.key}' was added with value: ${isQuotes(element.value)}`;
};

const remove = (element, deep) => `\nProperty '${deep}${element.key}' was removed`;

const updated = (element1, element2, deep) => {
  if (_.isObject(element1.value) && !_.isObject(element2.value)) {
    return `\nProperty '${deep}${element1.key}' was updated. From [complex value] to ${isQuotes(element2.value)}`;
  }
  if (!_.isObject(element1.value) && _.isObject(element2.value)) {
    return `\nProperty '${deep}${element1.key}' was updated. From ${isQuotes(element1.value)} to [complex value]`;
  }
  if (!_.isObject(element1.value) && !_.isObject(element2.value)) {
    return `\nProperty '${deep}${element1.key}' was updated. From ${isQuotes(element1.value)} to ${isQuotes(element2.value)}`;
  }
  return true;
};

const plainFormat = (tree, deep = '') => {
  let resultString = '';
  tree.forEach((item) => {
    if (Array.isArray(item.value)) {
      const newDeep = `${deep}${item.key}.`;
      resultString += `${plainFormat(item.value, newDeep)}`;
    } else {
      if (item.type === '- ') {
        const keyUpd = item.key;
        const itemUpd = tree.find((el) => el.type === '+ ' && el.key === keyUpd);
        if (itemUpd) {
          const itemUpd1 = item;
          const itemUpd2 = itemUpd;
          resultString += `${updated(itemUpd1, itemUpd2, deep)}`;
        } else {
          resultString += `${remove(item, deep)}`;
        }
      }
      if (item.type === '+ ') {
        if (!resultString.includes(`Property '${deep}${item.key}' was updated.`)) {
          resultString += `${add(item, deep)}`;
        }
      }
    }
  });
  return resultString;
};

export default plainFormat;
