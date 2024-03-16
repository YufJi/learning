/**
 * 双指针解法
 */
export function maxArea(heights: number[]) {
  if (heights.length < 2) {
    return 0;
  }

  let max = 0;
  let L = 0;
  let R = heights.length - 1;

  while (L < R) {
    const area = (R - L) * Math.min(heights[L], heights[R]);
    max = Math.max(max, area);

    if (heights[L] <= heights[R]) {
      L++;
    } else {
      R--;
    }
  }

  return max;
}

/**
 *  暴力解法
 */
export function maxAreaCrude(heights: number[]) {
  if (heights.length < 2) {
    return 0;
  }

  let max = 0;

  for (let i = 0; i < heights.length - 1; i++) {
    const left = heights[i];
    for (let j = i + 1; j < heights.length; j++) {
      const right = heights[j];
      
      const area = (j - i) * Math.min(left, right);

      if (area > max) {
        max = area;
      }
    }
  }

  return max;
}
