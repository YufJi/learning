import { kidsWithCandies } from '.';

describe('kidsWithCandies()', () => {
  test('Test case 0', () => {
    const candies = [2, 3, 5, 1, 3];
    const extraCandies = 3;
    const output = [true, true, true, false, true];
    expect(kidsWithCandies(candies, extraCandies)).toStrictEqual(output);
  });

  test('Test case 1', () => {
    const candies = [4, 2, 1, 1, 2];
    const extraCandies = 1;
    const output = [true, false, false, false, false];
    expect(kidsWithCandies(candies, extraCandies)).toStrictEqual(output);
  });

  test('Test case 2', () => {
    const candies = [12, 1, 12];
    const extraCandies = 10;
    const output = [true, false, true];
    expect(kidsWithCandies(candies, extraCandies)).toStrictEqual(output);
  });
});
