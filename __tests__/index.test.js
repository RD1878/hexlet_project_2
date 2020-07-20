import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const formatStylish = 'stylish';
const formatPlain = 'plain';
const formatJson = 'json';

const fileName1 = 'file1';
const fileName2 = 'file2';

const formatFileJson = '.json';
const formatFileYaml = '.yml';
const formatFileIni = '.ini';
const getPath = (filename) => path.join('__tests__/__fixtures__', filename);

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync('__tests__/__fixtures__/resultStylish.txt', 'utf8');
  resultPlain = fs.readFileSync('__tests__/__fixtures__/resultPlain.txt', 'utf8');
  resultJson = fs.readFileSync('__tests__/__fixtures__/resultJson.txt', 'utf8');
});

test.each([
  [formatStylish, resultStylish],
  [formatPlain, resultPlain],
  [formatJson, resultJson],
])('difference(%#)', (format, expected) => {
  const firstFileJson = getPath(`${fileName1}${formatFileJson}`);
  const secondFileJson = getPath(`${fileName2}${formatFileJson}`);
  expect(genDiff(firstFileJson, secondFileJson, format)).toBe(expected);
  const firstFileYaml = getPath(`${fileName1}${formatFileYaml}`);
  const secondFileYaml = getPath(`${fileName2}${formatFileYaml}`);
  expect(genDiff(firstFileYaml, secondFileYaml, format)).toBe(expected);
  const firstFileIni = getPath(`${fileName1}${formatFileIni}`);
  const secondFileIni = getPath(`${fileName2}${formatFileYaml}`);
  expect(genDiff(firstFileIni, secondFileIni, format)).toBe(expected);
});
