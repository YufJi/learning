
export function searchInsert(nums: number[], target: number): number {
  let L = 0;
  let R = nums.length - 1;

  if (target < nums[L]) {
    return 0;
  }

  if (target > nums[R]) {
    return R + 1;
  }

  while (L <= R) {
    const M = Math.floor((L + R) / 2);

    if (nums[M] === target) {
      return M;
    } else if (nums[M] < target) {
      L = M + 1;
    } else {
      R = M - 1;
    }
  }

  return L;
}
