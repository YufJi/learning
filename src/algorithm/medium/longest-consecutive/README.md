# 最长连续序列

## 描述

给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 O(n)。


## 思路

1. 使用一个集合（Set）存储所有的元素

2. 遍历数组，对于每个元素，判断是否存在于集合中，如果存在则跳过，否则继续

3. 对于每个元素，分别向左和向右查找，直到找到不连续的元素，记录连续元素的个数

4. 更新最大连续元素的个数

## 代码

```ts
function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let max = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let count = 1;

      while (set.has(current + 1)) {
        current++;
        count++;
      }

      max = Math.max(max, count);
    }
  }

  return max;
}

```

## 参考

- [LeetCode](https://leetcode-cn.com/problems/longest-consecutive-sequence)
