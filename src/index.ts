#!/usr/bin/env node
import program from 'commander';
import { fileMode, interactiveMode } from './io-cli';

async function cli(): Promise<void> {
  program
    .version('0.0.1')
    .description('Generates an obfuscated morse code message')
    .option('-f, --file <path>', 'Read the input from <path> and outputs it in a file <path>.min')
    .parse(process.argv);

  try {
    if (program.file) {
      await fileMode(program.file);
    } else {
      interactiveMode();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

cli();

export default cli;
