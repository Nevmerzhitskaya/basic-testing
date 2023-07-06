// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';
const customError = new MyAwesomeError();

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue('test');
    expect(data).toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Some errors occured')).toThrow(
      Error('Some errors occured'),
    );
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(customError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(rejectCustomError()).rejects.toThrow(customError);
  });
});
