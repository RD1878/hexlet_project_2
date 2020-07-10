import stylishFormat from './stylish.js';
import plain from './plain.js';

const formatter = (structure, format = 'stylish') => {
  if (format === 'stylish') {
    const result = stylishFormat(structure);
    return `{${result}\n}`;
  }
  if (format === 'plain') {
    const result = plain(structure).trim();
    return result;
  }
  return true;
};

export default formatter;
