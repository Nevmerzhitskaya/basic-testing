// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';


jest.mock('fs', () => jest.createMockFromModule('fs'));
jest.mock('fs/promises', () => jest.createMockFromModule('fs/promises'));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.clearAllTimers();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers({ timerLimit: 5 });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.clearAllTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(5000);
    expect(setInterval).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(5);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {

  test('should call join with pathToFile', async () => {
    const pathToFile = '/test/copy/someText.txt';
    const joinSpy = jest.spyOn(path, 'join').mockReturnValueOnce('/somefakepath');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toBeCalledWith(__dirname, pathToFile);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    const readFile = await readFileAsynchronously('/path/to/file2.txt');
    expect(readFile).toBeNull;
  });

  test('should return file content if file exists', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (fsPromises.readFile as jest.Mock).mockImplementation((_buf, _pos, len, _offset) =>
      Promise.resolve({
        buffer: Buffer.from('hello', 'utf8'),
        bytesRead: len
      }));
    const readFile = await readFileAsynchronously('/path/to/file2.txt');
    expect(readFile).toEqual(expect.any(String));
  });
});
