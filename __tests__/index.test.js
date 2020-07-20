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
  [formatFileJson],
  [formatFileYaml],
  [formatFileIni],
])('difference(%#)', (formatFile) => {
  const firstFile = getPath(`${fileName1}${formatFile}`);
  const secondFile = getPath(`${fileName2}${formatFile}`);
  expect(genDiff(firstFile, secondFile, formatStylish)).toBe(resultStylish);
  expect(genDiff(firstFile, secondFile, formatPlain)).toBe(resultPlain);
  expect(genDiff(firstFile, secondFile, formatJson)).toBe(resultJson);
});
