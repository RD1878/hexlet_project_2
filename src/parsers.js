import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumericValue = (value) => !_.isNaN(parseFloat(value));
const parseIniCustom = (data) => ini.parse(data);
const normalizeParsedObject = (object) => _.mapValues(object, (value) => {
  if (_.isObject(value)) {
    return normalizeParsedObject(value);
  }
  if (isNumericValue(value)) {
    return Number(value);
  }
  return value;
});

export default ({ data, formatName }) => {
  if (formatName === 'json') {
    return JSON.parse(data);
  }
  if (formatName === 'yml') {
    return yaml.safeLoad(data);
  }
  if (formatName === 'ini') {
    const parsedIni = parseIniCustom(data);
    return normalizeParsedObject(parsedIni);
  }
  return false;
};
