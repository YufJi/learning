export function longestPalindrome(s: string): string {
  const length = s.length;

  if (length < 2) {
    return s;
  }

  let start = 0;
  let max = 1;

  const dp = Array.from({ length }, () => Array(length).fill(false));

  let len = 1;
  while (len <= length) {
    for (let i = 0; i < length - len + 1; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) {
        if (len <= 2) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      if (dp[i][j] && len > max) {
        start = i;
        max = len;
      }
    }

    len++;
  }

  return s.substring(start, start + max);
}
