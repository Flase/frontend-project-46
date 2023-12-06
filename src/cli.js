import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { getParsedJsonObj, getParsedYamlObj } from './parsers.js';
import genDiff from './index.js';

const cliStart = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

  program
    .requiredOption('-f, --format <type>', 'output format')
    .arguments('filepath1 filepath2')
    .action((filepath1, filepath2) => {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const extension1 = path.extname(filepath1);
      const extension2 = path.extname(filepath2);

      const fileContent1 = fs.readFileSync(absolutePath1, 'utf-8');
      const fileContent2 = fs.readFileSync(absolutePath2, 'utf-8');

      let obj1; let obj2;

      switch (extension1) {
        case '.json':
          obj1 = getParsedJsonObj(fileContent1);
          break;
        case '.yaml':
        case '.yml':
          obj1 = getParsedYamlObj(fileContent1);
          break;
        default:
          throw new Error(`Unsupported file format: ${extension1}`);
      }

      switch (extension2) {
        case '.json':
          obj2 = getParsedJsonObj(fileContent2);
          break;
        case '.yaml':
        case '.yml':
          obj2 = getParsedYamlObj(fileContent2);
          break;
        default:
          throw new Error(`Unsupported file format: ${extension2}`);
      }

      console.log(genDiff(obj1, obj2));
    });

  program.parse();
};

export default cliStart;
