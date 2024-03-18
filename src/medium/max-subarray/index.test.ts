import { maxSubarray, maxSubarrayPartition } from '.';

describe('maxSubarray', () => {
  it('should return the maximum sum of a contiguous subarray', () => {
    expect(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    expect(maxSubarray([1])).toBe(1);
    expect(maxSubarray([5, 4, -1, 7, 8])).toBe(23);
  });
});

describe('maxSubarrayPartition', () => {
  it('should return the maximum sum of a contiguous subarray', () => {
    expect(maxSubarrayPartition([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    expect(maxSubarrayPartition([1])).toBe(1);
    expect(maxSubarrayPartition([5, 4, -1, 7, 8])).toBe(23);
  });
});
