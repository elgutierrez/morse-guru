
export function encodeMessage(msg: string): string {
  return obfuscateMorse(convertToMorse(msg));
}

export function convertToMorse(text: string): string {
  return text;
}

export function obfuscateMorse(morse: string): string {
  return morse;
}