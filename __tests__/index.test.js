import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fileFormats = ['json', 'yml', 'ini'];

const getPath = (filename) => path.join('__tests__/__fixtures__', filename);

const result = {
  stylish: '',
  plain: '',
  json: '',
};

beforeAll(() => {
  result.stylish = fs.readFileSync('__tests__/__fixtures__/resultStylish.txt', 'utf8');
  result.plain = fs.readFileSync('__tests__/__fixtures__/resultPlain.txt', 'utf8');
  result.json = fs.readFileSync('__tests__/__fixtures__/resultJson.txt', 'utf8');
});

test.each([
  ...fileFormats,
])('gendiff for "%s" input format', (fileFormat) => {
  const firstFile = getPath(`file1.${fileFormat}`);
  const secondFile = getPath(`file2.${fileFormat}`);
  expect(genDiff(firstFile, secondFile, 'stylish')).toBe(result.stylish);
  expect(genDiff(firstFile, secondFile, 'plain')).toBe(result.plain);
  expect(genDiff(firstFile, secondFile, 'json')).toBe(result.json);
});
