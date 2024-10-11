
export function minimalKSum(nums: number[], k: number): number {
  nums = nums.sort((a, b) => a - b);

  let result = 0;
  let prev = 0;

  let start, end, total;

  for (let i = 0; i < nums.length; i++) {
    if (k === 0) {
      break;
    }

    const num = nums[i];
    if (num - prev > 1) {
      start = prev + 1;
      end = Math.min(num - 1, prev + k);
      total = (end + start) * (end - start + 1) / 2;

      result += total;
      k -= (end - start + 1);
    }
    prev = num;
  }

  if (k > 0) {
    start = prev + 1;
    end = prev + k;
    total = (end + start) * (end - start + 1) / 2;
    result += total;
  }

  return result;
}
