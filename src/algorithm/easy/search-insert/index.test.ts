import { searchInsert } from '.';

describe('searchInsert', () => {
  it('returns 2', () => {
    const nums = [1, 3, 5, 6];
    const target = 5;
    expect(searchInsert(nums, target)).toBe(2);
  });

  it('returns 1', () => {
    const nums = [1, 3, 5, 6];
    const target = 2;
    expect(searchInsert(nums, target)).toBe(1);
  });

  it('returns 4', () => {
    const nums = [1, 3, 5, 6];
    const target = 7;
    expect(searchInsert(nums, target)).toBe(4);
  });

  it('returns 0', () => {
    const nums = [1, 3, 5, 6];
    const target = 0;
    expect(searchInsert(nums, target)).toBe(0);
  });

  it('returns 0', () => {
    const nums = [1];
    const target = 0;
    expect(searchInsert(nums, target)).toBe(0);
  });
});
