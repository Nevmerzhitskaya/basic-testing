// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const allAutoMocked = jest.createMockFromModule<typeof import('./index')>('./index');
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  
  return {
    __esModule: true,
    ...allAutoMocked,
    mockOne: jest.fn(() => []),
    mockTwo: jest.fn(() => []),
    mockThree: jest.fn(() => []),
    unmockedFunction: originalModule.unmockedFunction
  };  
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledTimes(1);
    logSpy.mockRestore();
  });
});
