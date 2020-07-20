import fs from 'fs';
import path from 'path';
import runParsing from './parsers.js';
import runFormat from './formatters/index.js';
import getStructure from './structure.js';

export default (pathToFile1, pathToFile2, format) => {
  const getFileInfo = (pathToFile) => {
    const fileFormat = path.extname(pathToFile);
    const fileValue = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
    return { fileFormat, fileValue };
  };
  const firstFile = runParsing(getFileInfo(pathToFile1));
  const secondFile = runParsing(getFileInfo(pathToFile2));
  const structure = getStructure(firstFile, secondFile);
  return runFormat(structure, format);
};
