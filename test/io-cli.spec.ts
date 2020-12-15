import events from 'events';

import fs from 'fs';
import readline from 'readline';
import { PassThrough } from 'stream';

import * as morse from '../src/morse';
import { interactiveMode, fileMode } from '../src/io-cli';

const mockEventEmitter = new events.EventEmitter();

jest.mock('../src/morse');
jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue(mockEventEmitter),
}));
jest.mock('fs');

const mockEncodeMessage = morse.encodeMessage as jest.Mock;

describe('method: interactiveMode', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('reads the stdin and encode the message', () => {
    const mockMessage = 'Some message';
    const mockEncodedMessage = 'Some encoded message';
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockEncodeMessage.mockReturnValue(mockEncodedMessage);

    interactiveMode();
    mockEventEmitter.emit('line', mockMessage);

    expect(readline.createInterface).toHaveBeenCalledWith({ input: process.stdin });
    expect(mockEncodeMessage).toHaveBeenCalledWith(mockMessage);
    expect(mockConsoleLog).toHaveBeenCalledWith(mockEncodedMessage);
  });
});

describe('method: fileMode', () => {
  const mockExistsSync = fs.existsSync as jest.Mock;
  const mockCreateReadStream = fs.createReadStream as jest.Mock;
  const mockCreateWriteStream = fs.createWriteStream as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns an error if the file doesnt exist', () => {
    mockExistsSync.mockReturnValue(false);
    expect(fileMode('./not_existant_file.txt')).rejects.toEqual("File './not_existant_file.txt' does not exits");
  });

  it('returns an error if there was an error in the read stream', async () => {
    mockExistsSync.mockReturnValue(true);

    const mockReadStream = new PassThrough();
    const mockWriteStream = new PassThrough();
    const mockFilePath = './existing_file.txt';
    const mockError = 'Some stream error';

    mockCreateReadStream.mockReturnValue(mockReadStream);
    mockCreateWriteStream.mockReturnValue(mockWriteStream);

    setTimeout(() => {
      mockReadStream.emit('error', mockError);
    }, 100);

    expect(fileMode(mockFilePath)).rejects.toEqual(mockError);
  });

  it('returns an error if there was an error in the write stream', async () => {
    mockExistsSync.mockReturnValue(true);

    const mockReadStream = new PassThrough();
    const mockWriteStream = new PassThrough();
    const mockFilePath = './existing_file.txt';
    const mockError = 'Some stream error';

    mockCreateReadStream.mockReturnValue(mockReadStream);
    mockCreateWriteStream.mockReturnValue(mockWriteStream);

    setTimeout(() => {
      mockWriteStream.emit('error', mockError);
    }, 100);

    expect(fileMode(mockFilePath)).rejects.toEqual(mockError);
  });

  it('reads the file, encode the message and write to the output file', async () => {
    mockExistsSync.mockReturnValue(true);

    const mockReadStream = new PassThrough();
    const mockWriteStream = new PassThrough();
    const mockFilePath = './existing_file.txt';

    mockCreateReadStream.mockReturnValue(mockReadStream);
    mockCreateWriteStream.mockReturnValue(mockWriteStream);

    const result = fileMode(mockFilePath);

    setTimeout(() => {
      mockReadStream.emit('data', 'some\n');
      mockReadStream.emit('data', 'message');
      mockReadStream.emit('end');
    }, 100);

    await expect(result).resolves.toEqual(undefined);

    expect(mockCreateReadStream).toHaveBeenCalledWith(mockFilePath, { flags: 'r' });
    expect(mockCreateWriteStream).toHaveBeenCalledWith(`${mockFilePath}.min`);
    expect(mockEncodeMessage).toHaveBeenCalledWith('some');
    expect(mockEncodeMessage).toHaveBeenCalledWith('message');
  });
});
