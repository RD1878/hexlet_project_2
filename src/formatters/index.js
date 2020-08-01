import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

export default (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylishFormat(tree);
    case 'plain':
      return plainFormat(tree);
    case 'json':
      return jsonFormat(tree);
    default:
      throw new Error(`Error! Output format ${format} is incorrect!`);
  }
};
