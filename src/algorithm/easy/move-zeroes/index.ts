export function moveZeroes(nums: number[]): void {
  let i = 0;
  let j = 0;

  while (i < nums.length) {
    if (nums[i] !== 0) {
      const temp = nums[j];
      nums[j] = nums[i];
      nums[i] = temp;
      j++;
    }

    i++;
  }
}

