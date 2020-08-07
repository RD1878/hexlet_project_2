import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import buildTree from './buildTree.js';

const getDataFromFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
const getFormatName = (pathToFile) => path.extname(pathToFile).slice(1);

export default (pathToFile1, pathToFile2, format) => {
  const parsedObject1 = parse(getDataFromFile(pathToFile1), getFormatName(pathToFile1));
  const parsedObject2 = parse(getDataFromFile(pathToFile2), getFormatName(pathToFile2));
  const tree = buildTree(parsedObject1, parsedObject2);
  return render(tree, format);
};
