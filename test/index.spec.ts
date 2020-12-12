jest.mock("../src/morse");
jest.mock("../src/io");

import { cli } from "../src/index";
import * as io from "../src/io";
import * as morse from "../src/morse";


const mockParseArgs = io.parseArgs as jest.Mock;
const mockReadInput = io.readInput as jest.Mock;
const mockWriteOutput = io.writeOutput as jest.Mock;

const mockConvertToMorse = morse.convertToMorse as jest.Mock;
const mockObfuscateMorse = morse.obfuscateMorse as jest.Mock;

describe("method: cli", () => {
  const mockInput = "HELLO";
  // TODO get the real morse for HELLO
  const mockMorse = "../.-|--/..|-./-|.-.|---|..-|-...|.-..|."
  const mockObfuscatedMorse = "4|1|1A2|1A2|C";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("happy path: succesfully converts to morse, obfuscate it and output it to a file", async () => {
    mockParseArgs.mockReturnValue(io.InputMode.FILE);
    mockReadInput.mockResolvedValue(mockInput);
    mockConvertToMorse.mockReturnValue(mockMorse);
    mockObfuscateMorse.mockReturnValue(mockObfuscatedMorse);

    await cli();

    expect(mockParseArgs).toHaveBeenCalledWith();
    expect(mockReadInput).toHaveBeenCalledWith(io.InputMode.FILE);
    expect(mockConvertToMorse).toHaveBeenCalledWith(mockInput);
    expect(mockObfuscateMorse).toHaveBeenCalledWith(mockMorse);
    expect(mockWriteOutput).toHaveBeenCalledWith(mockObfuscatedMorse);
  });
});