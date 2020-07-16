import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const formatStylish = 'stylish';
const formatPlain = 'plain';
const formatJson = 'json';
const getPath = (filename) => path.join('__tests__/__fixtures__', filename);

const firstFileJson = getPath('file1.json');
const secondFileJson = getPath('file2.json');
const firstFileYml = getPath('file1.yml');
const secondFileYml = getPath('file2.yml');
const firstFileIni = getPath('file1.ini');
const secondFileIni = getPath('file2.ini');
const resultStylish = fs.readFileSync('__tests__/__fixtures__/resultStylish.txt', 'utf8');
const resultPlain = fs.readFileSync('__tests__/__fixtures__/resultPlain.txt', 'utf8');
const resultJson = fs.readFileSync('__tests__/__fixtures__/resultJson.txt', 'utf8');

test.each([
  [firstFileJson, secondFileJson, formatStylish, resultStylish],
  [firstFileYml, secondFileYml, formatStylish, resultStylish],
  [firstFileIni, secondFileIni, formatStylish, resultStylish],
  [firstFileJson, secondFileJson, formatPlain, resultPlain],
  [firstFileYml, secondFileYml, formatPlain, resultPlain],
  [firstFileIni, secondFileIni, formatPlain, resultPlain],
  [firstFileJson, secondFileJson, formatJson, resultJson],
  [firstFileYml, secondFileYml, formatJson, resultJson],
  [firstFileIni, secondFileIni, formatJson, resultJson],
])('difference(%#)', (firstFile, secondFile, format, expected) => {
  expect(genDiff(firstFile, secondFile, format)).toBe(expected);
});
