import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import getParsedObj from './jsonParser.js';

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

      const fileContent1 = fs.readFileSync(absolutePath1, 'utf-8');
      const fileContent2 = fs.readFileSync(absolutePath2, 'utf-8');

      console.log(getParsedObj(fileContent1));
      console.log(getParsedObj(fileContent2));
    });

  program.parse();
};

export default cliStart;
