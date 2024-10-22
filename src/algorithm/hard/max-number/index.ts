export function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
  const m = nums1.length;
  const n = nums2.length;

  const maxSequence: number[] = new Array(k).fill(0);
  const start = Math.max(0, k - n);
  const end = Math.min(k, m);

  for (let i = start; i <= end; i++) {
    const subsequence1 = maxSubsequence(nums1, i);
    const subsequence2 = maxSubsequence(nums2, k - i);
    const currentSubsequence = merge(subsequence1, subsequence2);

    if (compare(currentSubsequence, 0, maxSequence, 0) > 0) {
      for (let j = 0; j < k; j++) {
        maxSequence[j] = currentSubsequence[j];
      }
    }
  }

  return maxSequence;
}

export function maxSubsequence(nums: number[], k: number): number[] {
  const len = nums.length;
  const stack: number[] = [];
  let top = -1;
  let remain = len - k;

  for (const num of nums) {
    while (top >= 0 && stack[top] < num && remain > 0) {
      top--;
      remain--;
    }

    if (top < k - 1) {
      stack[++top] = num;
    } else {
      remain--;
    }
  }

  return stack;
}

function merge(nums1: number[], nums2: number[]): number[] {
  const m = nums1.length;
  const n = nums2.length;

  if (m === 0) return nums2;
  if (n === 0) return nums1;

  const maxSequence: number[] = new Array(m + n).fill(0);
  let i = 0;
  let j = 0;

  for (let k = 0; k < m + n; k++) {
    if (compare(nums1, i, nums2, j) > 0) {
      maxSequence[k] = nums1[i++];
    } else {
      maxSequence[k] = nums2[j++];
    }
  }

  return maxSequence;
}

function compare(nums1: number[], i: number, nums2: number[], j: number): number {
  const m = nums1.length;
  const n = nums2.length;

  while (i < m && j < n) {
    const diff = nums1[i] - nums2[j];
    if (diff !== 0) {
      return diff;
    }
    i++;
    j++;
  }

  return (m - i) - (n - j);
}
