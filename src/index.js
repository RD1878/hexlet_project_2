import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formatters/index.js';
import buildTree from './buildTree.js';

/* const getDataAndFormatNameFromFile = (pathToFile) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  const formatName = path.extname(pathToFile).slice(1);
  return { data, formatName };
}; */

const getDataFromFile = (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
const getFormatNameFromFile = (pathToFile) => path.extname(pathToFile).slice(1);

export default (pathToFile1, pathToFile2, format) => {
  const parsedObject1 = parse(getDataFromFile(pathToFile1), getFormatNameFromFile(pathToFile1));
  const parsedObject2 = parse(getDataFromFile(pathToFile2), getFormatNameFromFile(pathToFile2));
  const tree = buildTree(parsedObject1, parsedObject2);
  return render(tree, format);
};
