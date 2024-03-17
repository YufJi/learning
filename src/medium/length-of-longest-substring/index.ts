export function lengthOfLongestSubstring(s: string): number {
  if (s.length < 2) {
    return s.length;
  }

  let max = 0;

  let L = 0;
  let R = 1;

  while (R < s.length) {
    // 右指针是否在窗口内存在
    const idx = s.slice(L, R).indexOf(s[R]);

    if (idx === -1) {
      max = Math.max(max, R - L + 1); 
      R++;
    } else {
      L += idx + 1;
    }
  }

  return max;
}
