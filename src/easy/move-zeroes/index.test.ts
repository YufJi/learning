import { moveZeroes } from '.';

describe('moveZeroes', () => {
  it('should move zeroes to the end of the array', () => {
    const nums = [0, 1, 0, 3, 12];
    moveZeroes(nums);
    expect(nums).toEqual([1, 3, 12, 0, 0]);
  });

  it('should move zeroes to the end of the array', () => {
    const nums = [0, 0, 1];
    moveZeroes(nums);
    expect(nums).toEqual([1, 0, 0]);
  });

  it('should move zeroes to the end of the array', () => {
    const nums = [0, 0, 0, 1];
    moveZeroes(nums);
    expect(nums).toEqual([1, 0, 0, 0]);
  });

  it('should move zeroes to the end of the array', () => {
    const nums = [0, 0, 0, 0];
    moveZeroes(nums);
    expect(nums).toEqual([0, 0, 0, 0]);
  });

  it('should move zeroes to the end of the array', () => {
    const nums = [1, 2, 3, 4];
    moveZeroes(nums);
    expect(nums).toEqual([1, 2, 3, 4]);
  });
});
