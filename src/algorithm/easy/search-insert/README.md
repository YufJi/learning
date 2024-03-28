# 搜索插入位置

## 描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

## 思路

双指针，二分查找，找到第一个大于等于 target 的位置。

## 代码

```ts
function searchInsert(nums: number[], target: number): number {
  let L = 0;
  let R = nums.length - 1;

  while (L <= R) {
    const M = Math.floor((L + R) / 2);
    if (nums[M] === target) {
      return M;
    } else if (nums[M] < target) {
      L = M + 1;
    } else {
      R = M - 1;
    }
  }

  return L;
}
```

## 参考

- [leetcode](https://leetcode-cn.com/problems/search-insert-position)
