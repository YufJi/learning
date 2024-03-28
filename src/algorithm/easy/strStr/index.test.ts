import { strStr } from '.';

describe('strStr', () => {
  test('Test case 1', () => {
    expect(strStr('hello', 'll')).toBe(2);
  });

  test('Test case 2', () => {
    expect(strStr('aaaaa', 'bba')).toBe(-1);
  });

  test('Test case 3', () => {
    expect(strStr('a', 'a')).toBe(0);
  });

  test('Test case 4', () => {
    expect(strStr('a', '')).toBe(0);
  });

  test('Test case 5', () => {
    expect(strStr('mississippi', 'issip')).toBe(4);
  });

  test('Test case 6', () => {
    expect(strStr('mississippi', 'issipi')).toBe(-1);
  });
});
