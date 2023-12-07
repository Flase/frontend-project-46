import { Command } from 'commander';
import genDiff from './index.js';

const cliStart = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

  program
    .requiredOption('-f, --format <type>', 'output format', 'stylish')
    .arguments('filepath1 filepath2')
    .action((filepath1, filepath2) => {
      const formatName = program.opts().format;

      genDiff(filepath1, filepath2, formatName);
    });
  program.parse();
};
export default cliStart;
