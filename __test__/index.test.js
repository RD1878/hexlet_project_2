import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getPath = (filename) => path.join('__fixtures__', filename);
const firstFile = getPath('before.json');
const secondFile = getPath('after.json');
const result = fs.readFileSync('__fixtures__/result.txt', 'utf8');

test('difference', () => {
  expect(genDiff(firstFile, secondFile)).toBe(result);
});
