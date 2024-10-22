import { maxNumber, maxSubsequence } from '.';

describe('maxSubsequence()', () => {
  test('Test case 1', () => {
    expect(maxSubsequence([3, 2, 1], 2)).toEqual([3, 2]);
  });

  test('Test case 2', () => {
    expect(maxSubsequence([3, 2, 1], 1)).toEqual([3]);
  });

  test('Test case 3', () => {
    expect(maxSubsequence([3, 2, 1], 3)).toEqual([3, 2, 1]);
  });

  test('Test case 3', () => {
    expect(maxSubsequence([5, 6, 4], 2)).toEqual([6, 4]);
  });
});

describe('maxNumber()', () => {
  test('Test case 1', () => {
    expect(maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5)).toEqual([9, 8, 6, 5, 3]);
  });

  test('Test case 2', () => {
    expect(maxNumber([6, 7], [6, 0, 4], 5)).toEqual([6, 7, 6, 0, 4]);
  });

  test('Test case 3', () => {
    expect(maxNumber([3, 9], [8, 9], 3)).toEqual([9, 8, 9]);
  });

  test('Test case 4', () => {
    expect(maxNumber([2, 5, 6, 4, 4, 0], [7, 3, 8, 0, 6, 5, 7, 6, 2], 15)).toEqual([7, 3, 8, 2, 5, 6, 4, 4, 0, 6, 5, 7, 6, 2, 0]);
  });
});
