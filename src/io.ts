
export enum InputMode {
  STDIN,
  FILE
}

export function parseArgs(): InputMode {
  return InputMode.STDIN;
}

export function readInput(mode: InputMode): Promise<string> {
  return Promise.resolve("");
}
  
export function writeOutput(text: string): Promise<void> {
  return Promise.resolve();
}