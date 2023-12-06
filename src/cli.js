import { Command } from 'commander';

const cliStart = () => {
  const program = new Command();
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');
  // .option('-V, --version', 'output the version number')
  // .option('-h, --help', 'output usage information');
  program
    .requiredOption('-f, --format <type>', 'output format')
    .arguments('filepath1 filepath2');
  // program.command('split')
  //   .description('Split a string into substrings and display as an array')
  //   .argument('<string>', 'string to split')
  //   .option('--first', 'display just the first substring')
  //   .option('-s, --separator <char>', 'separator character', ',')
  //   .action((str, options) => {
  //     const limit = options.first ? 1 : undefined;
  //     console.log(str.split(options.separator, limit));
  //   });

  program.parse();
};

export default cliStart;
