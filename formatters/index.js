import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatter = (structure, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return `{${stylishFormat(structure)}\n}`;
    case 'plain':
      return plainFormat(structure).trim();
    case 'json':
      return jsonFormat(structure);
    default:
      throw new Error(`Error! Format ${format} is incorrect!`);
  }
};

export default formatter;
