import fs from 'fs';
import path from 'path';
import runParsing from './parsers.js';
import runFormat from './formatters/index.js';
import getTree from './buildTree.js';

export default (pathToFile1, pathToFile2, format) => {
  const getFileInfo = (pathToFile) => {
    const data = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
    const formatName = path.extname(pathToFile).slice(1);
    return { data, formatName };
  };
  const firstFile = runParsing(getFileInfo(pathToFile1));
  const secondFile = runParsing(getFileInfo(pathToFile2));
  const tree = getTree(firstFile, secondFile);
  return runFormat(tree, format);
};
