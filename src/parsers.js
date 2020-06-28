import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import process from 'process';

export default (pathToFile) => {
  const fileValue = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  switch (path.extname(pathToFile)) {
    case '.json':
      return JSON.parse(fileValue);
    case '.yml':
      return yaml.safeLoad(fileValue);
    case '.ini':
      return ini.parse(fileValue);
    default:
      throw new Error(`Error! ${path.extname(pathToFile)} is incorrect`);
  }
};
