import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const getConvertedValue = (stringValue) => Number(stringValue);

const runNumbersIniParser = (object) => _.mapValues(object, (value) => {
  if (_.isObject(value)) {
    return runNumbersIniParser(value);
  }
  if (!_.isNaN(Number(value)) && typeof (value) !== 'boolean') {
    return getConvertedValue(value);
  }
  return value;
});

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
