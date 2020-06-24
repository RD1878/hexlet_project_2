import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

let firstFileJson;
let secondFileJson;
let firstFileYml;
let secondFileYml;
let result;
const getPath = (filename) => path.join('__fixtures__', filename);

beforeAll(() => {
  firstFileJson = getPath('before.json');
  secondFileJson = getPath('after.json');
  firstFileYml = getPath('before.yml');
  secondFileYml = getPath('after.yml');
  result = fs.readFileSync('__fixtures__/result.txt', 'utf8');
});

test('difference', () => {
  expect(genDiff(firstFileJson, secondFileJson)).toBe(result);
  expect(genDiff(firstFileYml, secondFileYml)).toBe(result);
});
