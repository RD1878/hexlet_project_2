import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import buildTree from './buildTree.js';

const getDataAndFormatNameFromFile = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  const formatName = path.extname(pathToFile).slice(1);
  return { data, formatName };
};

export default (pathToFile1, pathToFile2, format) => {
  const parsedPathToFile1 = parse(getDataAndFormatNameFromFile(pathToFile1));
  const parsedPathToFile2 = parse(getDataAndFormatNameFromFile(pathToFile2));
  const tree = buildTree(parsedPathToFile1, parsedPathToFile2);
  return render(tree, format);
};
