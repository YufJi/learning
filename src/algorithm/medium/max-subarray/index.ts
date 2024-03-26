export function maxSubarray(nums: number[]): number {
  if (nums.length < 1) {
    return 0;
  }

  let max = nums[0];
  // 前缀和
  let preSum = 0;
  for (let i = 0; i < nums.length; i++) {
    // 前缀和如果小于0，就从当前值开始重新计算
    preSum = Math.max(preSum + nums[i], nums[i]);
    // 更新最大值
    max = Math.max(max, preSum);
  }

  return max;
}

// 分治法
export function maxSubarrayPartition(nums: number[]): number {
  if (nums.length < 1) {
    return 0;
  }

  class Status {
    lSum: number; // [l, r] 内以 l 为左端点的最大子段和
    rSum: number; // [l, r] 内以 r 为右端点的最大子段和
    mSum: number; // [l, r] 内的最大子段和
    iSum: number; // [l, r] 的区间和

    constructor(l: number, r: number, m: number, i: number) {
      this.lSum = l;
      this.rSum = r;
      this.mSum = m;
      this.iSum = i;
    }
  }

  function pushUp(l: Status, r: Status): Status {
    const lSum = Math.max(l.lSum, l.iSum + r.lSum); // 以 l 为左端点的最大子段和
    const rSum = Math.max(r.rSum, r.iSum + l.rSum); // 以 r 为右端点的最大子段和
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum); // 最大子段和
    const iSum = l.iSum + r.iSum; // 区间和
    return new Status(lSum, rSum, mSum, iSum);

  }

  function getInfo(l: number, r: number): Status {
    if (l === r) {
      return new Status(nums[l], nums[l], nums[l], nums[l]);
    }

    const m = (l + r) >> 1;
    const lSub = getInfo(l, m);
    const rSub = getInfo(m + 1, r);
    return pushUp(lSub, rSub);
  }

  return getInfo(0, nums.length - 1).mSum;
}
