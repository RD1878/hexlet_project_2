import runParsing from './parsers.js';
import runFormat from '../formatters/index.js';
import getStructure from './structure.js';

const getDifference = (pathToFile1, pathToFile2, format) => {
  const firstFile = runParsing(pathToFile1);
  const secondFile = runParsing(pathToFile2);
  const structure = getStructure(firstFile, secondFile);
  const result = runFormat(structure, format);
  return result;
};

export default getDifference;
