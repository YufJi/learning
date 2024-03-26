import { gcdOfStrings } from '.';

describe('gcdOfStrings', () => {
  test('Test case 1', () => {
    expect(gcdOfStrings('ABCABC', 'ABC')).toBe('ABC');
  });

  test('Test case 2', () => {
    expect(gcdOfStrings('ABABAB', 'ABAB')).toBe('AB');
  });

  test('Test case 3', () => {
    expect(gcdOfStrings('LEET', 'CODE')).toBe('');
  });
});
