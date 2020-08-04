import _ from 'lodash';
import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formats = {
  stylish: makeStylish,
  plain: makePlain,
  json: makeJson,
};

export default (tree, format = 'stylish') => {
  if (_.has(formats, format)) {
    return formats[format](tree);
  }
  throw new Error(`Error! Output format ${format} is incorrect!`);
};
