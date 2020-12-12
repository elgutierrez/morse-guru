import { parseArgs, readInput, writeOutput } from "./io";
import { convertToMorse, obfuscateMorse } from "./morse";

export async function cli(): Promise<void> {
  const inputMode = parseArgs();
  const input = await readInput(inputMode);
  const morse = convertToMorse(input);
  const obfuscatedMorse = obfuscateMorse(morse);
  await writeOutput(obfuscatedMorse);
}

cli();

