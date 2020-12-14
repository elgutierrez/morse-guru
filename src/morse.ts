
export function encodeMessage(msg: string): string {
  return obfuscateMorse(convertToMorse(msg));
}

export function convertToMorse(text: string): string {
  const words = text.trim().toUpperCase().split(" ");
  const getCharCode = (char: string) => MORSE_CODES[char] ? MORSE_CODES[char] : "";
  const getWordCode = (word: string) => Array.from(word)
    .map((char) => getCharCode(char))
    .filter(char => !!char)
    .join("|");
  return words.map((word: string) => getWordCode(word)).join("/");
}

export function obfuscateMorse(morse: string): string {
  let result = "", counter = 1;
  const getEncoded = (char: string, counter: number) =>  char === "." ? counter : String.fromCharCode(64 + counter);
  Array.from(morse).forEach((char, i) => {
    if (char === "." || char === "-") {
      if (char === morse[i + 1]) {
        counter++;
      } else {
        result += getEncoded(char, counter);
        counter = 1;
      }
    } else {
      // Don't transform |, /
      result += char;
    }
  });
  return result;
}

export const MORSE_CODES: {[char: string]: string} = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
}