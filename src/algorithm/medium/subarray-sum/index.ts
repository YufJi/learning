export function subarraySum(nums: number[], target: number): number {
  const map = new Map<number, number>();
  map.set(0, 1);
  
  let count = 0;  
  // 算出前缀和
  let preSum = 0;
  for (let i = 0; i < nums.length; i++) {
    preSum += nums[i];

    const rest = preSum - target;
    if (map.has(rest)) {
      count += map.get(rest);
    }

    map.set(preSum, (map.get(preSum) || 0) + 1);
  }
  
  return count;
}
