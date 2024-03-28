export function waysToStep(n: number): number {
  // 初始状态
  const dp = [1, 1, 2];

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000007;
  }

  return dp[n];
}
