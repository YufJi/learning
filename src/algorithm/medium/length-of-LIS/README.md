# 最长递增子序列

## 描述

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列


## 思路

动态规划

- 状态定义：dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度

- 状态转移方程：dp[i] = max(dp[i], dp[j] + 1) for j in [0, i)

- 初始状态：dp[i] = 1

## 参考

[leetcode](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
