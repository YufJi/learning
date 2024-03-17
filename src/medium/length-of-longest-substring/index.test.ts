import { lengthOfLongestSubstring } from '.';

describe('lengthOfLongestSubstring', () => {
  test('Example 1', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('Example 2', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  test('Example 3', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });

  test('Example 4', () => {
    expect(lengthOfLongestSubstring('')).toBe(0);
  });

  test('Example 5', () => {
    expect(lengthOfLongestSubstring(' ')).toBe(1);
  });

  test('Example 6', () => {
    expect(lengthOfLongestSubstring('au')).toBe(2);
  });

  test('Example 7', () => {
    expect(lengthOfLongestSubstring('dvdf')).toBe(3);
  });

  test('Example 8', () => {
    expect(lengthOfLongestSubstring('tmmzuxt')).toBe(5);
  }); 
});
