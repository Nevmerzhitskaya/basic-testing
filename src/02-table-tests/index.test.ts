// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 3, b: 8, action: Action.Multiply, expected: 24 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'Cos', expected: null },
  { a: '2', b: 3, action: Action.Exponentiate, expected: null } 
];

describe('simpleCalculator', () => {
  test.each(testCases)('returns $expected when $a is $action to $b', ({a, b, action, expected}) => {
    expect(simpleCalculator({a: a, b: b, action: action})).toBe(expected);
   });
});
