
export function removeElement(nums: number[], target: number): number {
  let i = 0;

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== target) {
      nums[i] = nums[j];
      // 也可以将nums[j]置空
      i++;
    }
  }

  return i;
}
