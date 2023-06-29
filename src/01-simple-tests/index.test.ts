// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 1, b: 2, action: Action.Add})).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 5, b: 2, action: Action.Subtract})).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 3, b: 8, action: Action.Multiply})).toBe(24);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 10, b: 5, action: Action.Divide})).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 2, b: 3, action: Action.Exponentiate})).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 2, b: 3, action: Action.Exponentiate})).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: '2', b: 3, action: 'Cos'})).toBeNull;
  });
});
