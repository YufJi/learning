export function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  // 空字符串匹配空字符串
  dp[0][0] = true;

  const matches = (i: number, j: number) => {
    // s 为空
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
        // 匹配0次，或匹配1次或多次
        dp[i][j] = dp[i][j - 2] || (matches(i, j - 1) && dp[i - 1][j]);
      } else {
        // 匹配，且前一个也匹配
        dp[i][j] = matches(i, j) && dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}
