# 最长回文字串

## 描述

给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

 

示例 1：
```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

```
示例 2：

输入：s = "cbbd"
输出："bb"
```

提示：

1 <= s.length <= 1000

s 仅由数字和英文字母组成


## 思路

1. 使用动态规划，dp[i][j] 表示 s[i:j] 是否是回文串

2. 状态转移方程为：dp[i][j] = dp[i+1][j-1] && s[i] == s[j]

3. 初始化：dp[i][i] = True, dp[i][i+1] = s[i] == s[i+1]


## 参考

[leetcode](https://leetcode-cn.com/problems/longest-palindromic-substring)
