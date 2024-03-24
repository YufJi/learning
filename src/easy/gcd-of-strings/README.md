# 字符串的最大公因子

## 描述

对于字符串 `S` 和 `T`，只有在 `S = T + ... + T`（`T` 与自身连接 1 次或多次）时，我们才认定 “`T` 能除尽 `S`”。

返回最长字符串 `X`，要求满足 `X` 能除尽 `str1` 且 `X` 能除尽 `str2`。

示例 1：

```txt
输入：str1 = "ABCABC", str2 = "ABC"
输出："ABC"
```

示例 2：

```txt
输入：str1 = "ABABAB", str2 = "ABAB"
输出："AB"
```

示例 3：

```txt
输入：str1 = "LEET", str2 = "CODE"
输出：""
```

提示：

1. `1 <= str1.length <= 1000`


## 思路

1、如果两个字符存在公因子，那么两个字符串分别首尾拼接后一定相等

2、根据[欧几里得算法](https://baike.baidu.com/item/%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95/1647675), gcd(a,b) = gcd(b,a mod b)


## 参考

- [leetcode](https://leetcode-cn.com/problems/gcd-of-strings)
