import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const inputFormats = ['json', 'yml', 'ini'];

const getPath = (filename) => path.join('__tests__/__fixtures__', filename);

let expectedResult;

beforeAll(() => {
  expectedResult = {
    stylish: fs.readFileSync('__tests__/__fixtures__/resultStylish.txt', 'utf8'),
    plain: fs.readFileSync('__tests__/__fixtures__/resultPlain.txt', 'utf8'),
    json: fs.readFileSync('__tests__/__fixtures__/resultJson.txt', 'utf8'),
  };
});

test.each(
  inputFormats,
)('gendiff for "%s" input format', (fileFormat) => {
  const pathToFile1 = getPath(`file1.${fileFormat}`);
  const pathToFile2 = getPath(`file2.${fileFormat}`);
  expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toBe(expectedResult.stylish);
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(expectedResult.plain);
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toBe(expectedResult.json);
});
