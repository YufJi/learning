import { longestPalindrome } from '.';

describe('longestPalindrome', () => {
  test('Test case 1', () => {
    expect(longestPalindrome('babad')).toBe('bab');
  });

  test('Test case 2', () => {
    expect(longestPalindrome('cbbd')).toBe('bb');
  });

  test('Test case 3', () => {
    expect(longestPalindrome('a')).toBe('a');
  });

  test('Test case 4', () => {
    expect(longestPalindrome('ac')).toBe('a');
  });
});
