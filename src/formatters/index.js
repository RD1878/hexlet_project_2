import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

export default (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return makeJson(tree);
    default:
      throw new Error(`Error! Output format ${format} is incorrect!`);
  }
};
