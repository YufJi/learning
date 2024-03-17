import { subarraySum } from '.';

describe('subarraySum', () => {
  it('should return the number of subarrays that sum to target', () => {
    expect(subarraySum([1, 1, 1], 2)).toBe(2);
    expect(subarraySum([1, 2, 3], 3)).toBe(2);
    expect(subarraySum([1], 0)).toBe(0);
    expect(subarraySum([-1, -1, 1], 0)).toBe(1);
  });
});
