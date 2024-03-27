export function singleNumber(nums: number[]): number {
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    result ^= num;
  }

  return result;
}
