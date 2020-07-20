import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const getConvertedValue = (stringValue) => {
  const number = Number(stringValue);
  return _.isNaN(number) ? stringValue : number;
};

/* const runNumbersIniParser = (object) => {
  const parsingObject = object;
  const entries = Object.entries(parsingObject);
  entries.forEach(([key, value]) => {
    if (_.isObject(value)) {
      runNumbersIniParser(value);
    }
    if (typeof (value) === 'string') {
      parsingObject[key] = getConvertedValue(value);
    }
  });
  return parsingObject;
}; */

const runNumbersIniParser = (object) => {
  const parsingObject = object;
  _.mapValues(parsingObject, (key, value) => {
    if (_.isObject(value)) {
      runNumbersIniParser(value);
    }
    if (typeof (value) === 'string') {
      parsingObject[key] = getConvertedValue(value);
    }
  });
  return parsingObject;
};

export default ({ fileFormat, fileValue }) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse(fileValue);
    case '.yml':
      return yaml.safeLoad(fileValue);
    case '.ini':
      return runNumbersIniParser(ini.parse(fileValue));
    default:
      throw new Error(`Error! Path to file: ${fileFormat} is incorrect`);
  }
};
