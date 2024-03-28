# 正则表达式匹配

## 描述

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

- '.' 匹配任意单个字符
- '*' 匹配零个或多个前面的那一个元素

所谓匹配，是要涵盖整个字符串 s 的，而不是部分字符串。

## 思路

这道题是一个经典的动态规划问题，我们可以使用动态规划来解决。

我们定义 `dp[i][j]` 表示字符串 `s` 的前 `i` 个字符和模式 `p` 的前 `j` 个字符是否匹配。

- 如果 `p[j]` 是一个小写字母，那么 `dp[i][j]` 只能由 `dp[i-1][j-1]` 转移而来，也就是说，`s[i]` 和 `p[j]` 一定要相同。
- 如果 `p[j]` 是 `.`，那么 `dp[i][j]` 只能由 `dp[i-1][j-1]` 转移而来，也就是说，`s[i]` 和 `p[j]` 可以是任意字符。

- 如果 `p[j]` 是 `*`，那么 `dp[i][j]` 可以由 `dp[i][j-2]` 转移而来，表示 `*` 匹配了 `0` 次；也可以由 `dp[i-1][j]` 转移而来，表示 `*` 匹配了至少 `1` 次。

最终的答案即为 `dp[m][n]`，其中 `m` 和 `n` 分别是字符串 `s` 和模式 `p` 的长度。

## 代码

```ts
function isMathch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  const match = (i: number, j: number) => {
    if (i === 0) {
      return false;
    }
    if (p[j - 1] === '.') {
      return true;
    }
    return s[i - 1] === p[j - 1];
  };

  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2] || (match(i, j - 1) && dp[i - 1][j]);
      } else {
        dp[i][j] = match(i, j) && dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}
```

## 参考

- [leetcode](https://leetcode.com/problems/regular-expression-matching/)
