import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

let firstFileJson;
let secondFileJson;
let firstFileYml;
let secondFileYml;
let firstFileIni;
let secondFileIni;
let resultStylish;
let resultPlain;
const formatStylish = 'stylish';
const formatPlain = 'plain';
const getPath = (filename) => path.join('__fixtures__', filename);

beforeAll(() => {
  firstFileJson = getPath('before.json');
  secondFileJson = getPath('after.json');
  firstFileYml = getPath('before.yml');
  secondFileYml = getPath('after.yml');
  firstFileIni = getPath('before.ini');
  secondFileIni = getPath('after.ini');
  resultStylish = fs.readFileSync('__fixtures__/resultStylish.txt', 'utf8');
  resultPlain = fs.readFileSync('__fixtures__/resultPlain.txt', 'utf8');
});

test('stylish', () => {
  expect(genDiff(firstFileJson, secondFileJson, formatStylish)).toBe(resultStylish);
  expect(genDiff(firstFileYml, secondFileYml, formatStylish)).toBe(resultStylish);
  expect(genDiff(firstFileIni, secondFileIni, formatStylish)).toBe(resultStylish);
});

test('plain', () => {
  expect(genDiff(firstFileJson, secondFileJson, formatPlain)).toBe(resultPlain);
  expect(genDiff(firstFileYml, secondFileYml, formatPlain)).toBe(resultPlain);
  expect(genDiff(firstFileIni, secondFileIni, formatPlain)).toBe(resultPlain);
});
