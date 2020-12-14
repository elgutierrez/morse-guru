#!/usr/bin/env node
import readline from "readline";
import es from "event-stream";
import { existsSync, createReadStream, createWriteStream } from 'fs';
import { encodeMessage } from "./morse";

export function fileMode(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!existsSync(filePath)) {
      return reject(`File '${filePath}' does not exits`)
    }
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(`${filePath}.min`);

    readStream
      .on('error', reject)
      .pipe(es.mapSync((chunk: string) => encodeMessage(chunk.toString())))
      .pipe(writeStream)
      .on('finish', resolve)
      .on('error', reject)
  })
}

export function interactiveMode(): void {
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", (line) => console.log(encodeMessage(line)));
}

