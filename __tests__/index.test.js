import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const inputFormats = ['json', 'yml', 'ini'];

const getFixturePath = (filename) => path.join('__tests__/__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let expectedResult;

beforeAll(() => {
  expectedResult = {
    stylish: readFixture('resultStylish.txt'),
    plain: readFixture('resultPlain.txt'),
    json: readFixture('resultJson.txt'),
  };
});

test.each(
  inputFormats,
)('gendiff for "%s" input format', (fileFormat) => {
  const pathToFile1 = getFixturePath(`file1.${fileFormat}`);
  const pathToFile2 = getFixturePath(`file2.${fileFormat}`);
  expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toBe(expectedResult.stylish);
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(expectedResult.plain);
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toBe(expectedResult.json);
});
