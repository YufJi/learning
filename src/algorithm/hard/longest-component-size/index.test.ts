import { largestComponetSize } from '.';

describe('largestComponetSize()', () => {
  test('Test case 1', () => {
    expect(largestComponetSize([6, 4, 15, 35])).toBe(4);
  });

  test('Test case 2', () => {
    expect(largestComponetSize([20, 50, 9, 63])).toBe(2);
  });

  test('Test case 3', () => {
    expect(largestComponetSize([2, 3, 6, 7, 4, 12, 21, 39])).toBe(8);
  });
});
