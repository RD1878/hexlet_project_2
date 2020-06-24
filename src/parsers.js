import yaml from 'js-yaml';

export const parserJson = (value) => JSON.parse(value);
export const parserYaml = (value) => yaml.safeLoad(value);
