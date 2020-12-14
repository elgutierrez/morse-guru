const baseCommander = jest.requireActual("commander");
const mockCommander: Command = {
  ...baseCommander,
  version: jest.fn().mockImplementation(() => mockCommander),
  description: jest.fn().mockImplementation(() => mockCommander),
  option: jest.fn().mockImplementation(() => mockCommander),
  parse: jest.fn().mockImplementation(() => mockCommander),
};
  
jest.mock("commander", () => mockCommander);
jest.mock("../src/io-cli");

import { cli } from "../src/index";
import * as ioCli from "../src/io-cli";
import program, { Command } from "commander";

const mockFileMode = ioCli.fileMode as jest.Mock;
const mockInteractiveMode = ioCli.interactiveMode as jest.Mock;

describe("method: cli", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("configure cli parameter", async () => {
    cli();
    expect(mockCommander.option).toHaveBeenCalledWith('-f, --file <path>', 'Read the input from <path> and outputs it in a file <path>.min');
    expect(mockCommander.parse).toHaveBeenCalledWith(process.argv);
  });

  it("run the file mode if the -file flag is present", async () => {
    const mockFilePath = "./some_file.txt";
    program.file = mockFilePath;
    await cli();
    expect(mockFileMode).toHaveBeenCalledWith(mockFilePath);
  });

  it("run the interactive mode if no flag present", () => {
    program.file = null;
    cli();
    expect(mockInteractiveMode).toHaveBeenCalled();
  });
});