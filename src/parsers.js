import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumericValue = (value) => !_.isNaN(parseFloat(value));

const normalizeParsedObject = (object) => _.mapValues(object, (value) => {
  if (_.isObject(value)) {
    return normalizeParsedObject(value);
  }
  if (isNumericValue(value)) {
    return Number(value);
  }
  return value;
});

const parseIniCustom = (data) => {
  const defaultParsedObject = ini.parse(data);
  return normalizeParsedObject(defaultParsedObject);
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIniCustom,
};

export default ({ data, formatName }) => {
  if (_.has(parsers, formatName)) {
    return parsers[formatName](data);
  }
  throw new Error(`Error! Input format of file ${formatName} is incorrect!`);
};
