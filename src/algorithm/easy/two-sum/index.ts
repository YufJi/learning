export function twoSum(nums: number[], target: number): number[] {
  let result: number[] = [];
  const hashMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const rest = target - num;

    if (hashMap.has(rest)) {
      result = [hashMap.get(rest), i];
      break;
    } else {
      hashMap.set(num, i);
    }
  }

  return result;
}
