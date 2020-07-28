import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const isNumericValue = (value) => !_.isNaN(parseFloat(value));
const parseIniCustom = (data) => {
  const defaultParsedObject = ini.parse(data);
  const normalizeParsedObject = (object) => _.mapValues(object, (value) => {
    if (_.isObject(value)) {
      return normalizeParsedObject(value);
    }
    if (isNumericValue(value)) {
      return Number(value);
    }
    return value;
  });
  const result = normalizeParsedObject(defaultParsedObject);
  return result;
};

export default ({ data, formatName }) => {
  const typesOfParsing = {
    json: (obj) => JSON.parse(obj),
    yml: (obj) => yaml.safeLoad(obj),
    ini: (obj) => parseIniCustom(obj),
  };
  const keysOfTypes = _.keys(typesOfParsing);
  const key = keysOfTypes.find((item) => `${item}` === formatName);
  return (typesOfParsing[key](data));
};
