import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const numbersIniParser = (object) => {
  const parsingObject = object;
  const entries = Object.entries(parsingObject);
  entries.forEach(([key, value]) => {
    if (typeof (value) === 'string') {
      const number = Number(value);
      parsingObject[key] = _.isNaN(number) ? parsingObject[key] : number;
    }
    if (_.isObject(value)) {
      numbersIniParser(value);
    }
  });
  return parsingObject;
};

export default (pathToFile) => {
  const fileValue = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  if (path.extname(pathToFile) === '.json') {
    const result = JSON.parse(fileValue);
    return result;
  }
  if (path.extname(pathToFile) === '.yml') {
    const result = yaml.safeLoad(fileValue);
    return result;
  }
  if (path.extname(pathToFile) === '.ini') {
    const result = numbersIniParser(ini.parse(fileValue));
    return result;
  }
  throw new Error(`Error! Path to file: ${path.extname(pathToFile)} is incorrect`);
};
