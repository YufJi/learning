import { longestCommonPrefix } from '.';

describe('longestCommonPrefix', () => {
  test('Test case 1', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });

  test('Test case 2', () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });

  test('Test case 3', () => {
    expect(longestCommonPrefix(['ab', 'a'])).toBe('a');
  });

  test('Test case 4', () => {
    expect(longestCommonPrefix(['a', 'ab'])).toBe('a');
  });

  test('Test case 5', () => {
    expect(longestCommonPrefix(['a', 'a'])).toBe('a');
  });

  test('Test case 6', () => {
    expect(longestCommonPrefix(['a', 'b'])).toBe('');
  });

  test('Test case 7', () => {
    expect(longestCommonPrefix(['a'])).toBe('a');
  });

  test('Test case 8', () => {
    expect(longestCommonPrefix([''])).toBe('');
  });

  test('Test case 9', () => {
    expect(longestCommonPrefix([])).toBe('');
  });
});
