# 三步问题

## 描述

有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。


## 思路

动态规划，dp[i] = dp[i-1] + dp[i-2] + dp[i-3]，dp[0] = 1, dp[1] = 1, dp[2] = 2


## 参考

- [leetcode](https://leetcode-cn.com/problems/three-steps-problem-lcci)
