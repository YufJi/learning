import { isMatch } from '.';

describe('isMatch', () => {
  test('Test case 0', () => {
    expect(isMatch('aa', 'a')).toBe(false);
  });

  test('Test case 1', () => {
    expect(isMatch('aa', 'a*')).toBe(true);
  });

  test('Test case 2', () => {
    expect(isMatch('ab', '.*')).toBe(true);
  });

  test('Test case 3', () => {
    expect(isMatch('aab', 'c*a*b')).toBe(true);
  });

  test('Test case 4', () => {
    expect(isMatch('mississippi', 'mis*is*p*.')).toBe(false);
  });

  test('Test case 5', () => {
    expect(isMatch('ab', '.*c')).toBe(false);
  });

  test('Test case 6', () => {
    expect(isMatch('a', 'ab*')).toBe(true);
  });

  test('Test case 7', () => {
    expect(isMatch('a', '.*..a*')).toBe(false);
  });

  test('Test case 8', () => {
    expect(isMatch('a', '.*..')).toBe(false);
  });

  test('Test case 9', () => {
    expect(isMatch('a', '.*')).toBe(true);
  });

  test('Test case 10', () => {
    expect(isMatch('a', '.*c')).toBe(false);
  });

  test('Test case 11', () => {
    expect(isMatch('a', '.*c*')).toBe(true);
  });

  test('Test case 12', () => {
    expect(isMatch('a', '.*c*a')).toBe(true);
  });

  test('Test case 13', () => {
    expect(isMatch('a', '.*c*a*')).toBe(true);
  });

  test('Test case 14', () => {
    expect(isMatch('a', '.*c*a*b')).toBe(false);
  });

  test('Test case 15', () => {
    expect(isMatch('a', '.*c*a*b*')).toBe(true);
  });

  test('Test case 16', () => {
    expect(isMatch('a', '.*c*a*b*c')).toBe(false);
  });

  test('Test case 17', () => {
    expect(isMatch('a', '.*c*a*b*c*')).toBe(true);
  });
});
