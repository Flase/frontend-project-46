import path from 'path';
import fs from 'fs';
import { getObject } from './parsers.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const extension1 = path.extname(absolutePath1);
  const extension2 = path.extname(absolutePath2);

  const fileContent1 = fs.readFileSync(filepath1, 'utf-8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf-8');

  const obj1 = getObject(fileContent1, extension1);
  const obj2 = getObject(fileContent2, extension2);

  const formatter = getFormatter(formatName);
  console.log(formatter(obj1, obj2));
};

export default genDiff;
