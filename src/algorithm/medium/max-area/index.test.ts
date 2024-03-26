import { maxAreaCrude, maxArea  } from '.';

describe('maxAreaCrude', () => {
  it('get maxArea crude', () => {
    expect(maxAreaCrude([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(maxAreaCrude([1, 1])).toBe(1);
    expect(maxAreaCrude([4, 3, 2, 1, 4])).toBe(16);
    expect(maxAreaCrude([1, 2, 1])).toBe(2);
  });

  it('get maxArea', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(maxArea([1, 1])).toBe(1);
    expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
    expect(maxArea([1, 2, 1])).toBe(2);
  });
});
