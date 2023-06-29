// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: '2', action: Action.Add, expected: null },
  { a: '3', b: '2', action: Action.Add, expected: null },
  { a: '1', b: 2, action: 'Remove', expected: null },
  { a: 2, b: '2', action: 'Remove', expected: null },
  { a: '3', b: '2', action: 'Remove', expected: null },
  { a: 3, b: 2, action: 'Remove', expected: null }  
];

describe('simpleCalculator', () => {
  test.each(testCases)('returns $expected when $a is $action to $b', ({a, b, action, expected}) => {
    expect(simpleCalculator({a: a, b: b, action: action})).toBe(expected);
   });
});
