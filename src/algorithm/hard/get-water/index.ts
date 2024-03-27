
/**
 * 双指针解法
 */
export function getWater(heights: number[]) {
  if (heights.length < 3) {
    return 0;
  }

  let water = 0;
  let L = 1;
  let R = heights.length - 2;
  let leftMax = heights[0];
  let rightMax = heights[heights.length - 1];

  while (L <= R) {
    if (leftMax <= rightMax) {
      const height = heights[L];
      water += Math.max(0, leftMax - height);
      leftMax = Math.max(leftMax, height);
      L++;
    } else {
      const height = heights[R];
      water += Math.max(0, rightMax - height);
      rightMax = Math.max(rightMax, height);
      R--;
    }
  }

  return water;
}

/**
 * 暴力解法
 * 时间复杂度 O(n^2)
 */
export function getWaterCrude(heights: number[]) {
  let water = 0;

  if (heights.length < 3) {
    return 0;
  }

  for (let i = 1; i < heights.length - 1; i++) {
    const height = heights[i];
    let leftMax = 0;
    let rightMax = 0;

    for (let j = 0; j < i; j++) {
      leftMax = Math.max(leftMax, heights[j]);
    }

    for (let k = i + 1; k < heights.length; k++) {
      rightMax = Math.max(rightMax, heights[k]);
    }

    const min = Math.min(leftMax, rightMax);
    if (min > height) {
      water += min - height;
    }
  }

  return water;
}

/**
 * 暴力解法优化
 * 空间复杂度 O(n)
 */
export function getWaterCrudeOptimized(heights: number[]) {
  if (heights.length < 3) {
    return 0;
  }

  let water = 0;

  const leftMaxs = [];
  const rightMaxs = [];

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    leftMaxs[i] = Math.max(leftMaxs[i - 1] || 0, height);
  }

  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    rightMaxs[i] = Math.max(rightMaxs[i + 1] || 0, height);
  }

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    const leftMax = leftMaxs[i];
    const rightMax = rightMaxs[i];

    const min = Math.min(leftMax, rightMax);
    if (min > height) {
      water += min - height;
    }
  }

  return water;
}
