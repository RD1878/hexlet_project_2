import yaml from 'js-yaml';
import ini from 'ini';

export const parserJson = (value) => JSON.parse(value);
export const parserYaml = (value) => yaml.safeLoad(value);
export const parserIni = (value) => ini.parse(value);
