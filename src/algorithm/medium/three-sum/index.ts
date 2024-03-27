
export function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];

  if (nums.length < 3) {
    return result;
  }

  // 从小到大排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    const num = nums[i];
    if (num > 0) {
      break;
    }

    // 去重
    if (i > 0 && num === nums[i - 1]) {
      continue;
    }

    let L = i + 1;
    let R = nums.length - 1;

    while (L < R) {
      const sum = num + nums[L] + nums[R];
      if (sum === 0) {
        result.push([num, nums[L], nums[R]]);

        // 去重
        while (L < R && nums[L] === nums[L + 1]) {
          L++;
        }
        while (L < R && nums[R] === nums[R - 1]) {
          R--;
        }
        
        L++;
        R--;
      } else if (sum < 0) {
        L++;
      } else {
        R--;
      }
    }
  }

  return result;
}

export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}
