import { threeSum, quickSort } from '.';

describe('threeSum', () => {
  it('returns the correct result for [0, 0, 0, 0]', () => {
    const nums = [0, 0, 0, 0];
    expect(threeSum(nums)).toEqual([[0, 0, 0]]);
  });

  it('returns the correct result for [-1, 0, 1, 2, -1, -4]', () => {
    const nums = [-1, 0, 1, 2, -1, -4];
    expect(threeSum(nums)).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });

  it('returns the correct result for []', () => {
    const nums: number[] = [];
    expect(threeSum(nums)).toEqual([]);
  });

  it('returns the correct result for [0]', () => {
    const nums = [0];
    expect(threeSum(nums)).toEqual([]);
  });
});

describe('quickSort', () => {
  it('returns the correct result for [3, 1, 2]', () => {
    const arr = [3, 1, 2];
    expect(quickSort(arr)).toEqual([1, 2, 3]);
  });

  it('returns the correct result for [3, 1, 2, 4]', () => {
    const arr = [3, 1, 2, 4];
    expect(quickSort(arr)).toEqual([1, 2, 3, 4]);
  });

  it('returns the correct result for [3, 1, 2, 4, 5]', () => {
    const arr = [3, 1, 2, 4, 5];
    expect(quickSort(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns the correct result for [3, 1, 2, 4, 5, 6]', () => {
    const arr = [3, 1, 2, 4, 5, 6];
    expect(quickSort(arr)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
