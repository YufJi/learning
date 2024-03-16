
import { Stack } from '@/shared/Stack';

/**
 * 栈实现
 * 空间复杂度 O(n) 
 */
export function longestValidParentheses(s: string): number {
  let max = 0;
  const stack = new Stack<number>();

  // 初始化栈
  stack.push(-1);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(') {
      stack.push(i);
    } else {
      stack.pop();

      if (stack.isEmpty()) {
        stack.push(i);
      } else {
        max = Math.max(max, i - stack.peek());
      }
    }
  }

  return max;
}

/**
 * 动态规划
 */
export function longestValidParenthesesDp(s: string): number {
  let max = 0;
  const dp = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char === '(') {
      dp[i] = 0;
    } else if (s[i - 1] === '(') {
      dp[i] = (dp[i - 2] || 0) + 2;
    } else {
      const j = i - (dp[i - 1] || 0) - 1;

      if (s[j] === '(') {
        dp[i] = (dp[i - 1] || 0) + (dp[j - 1] || 0) + 2;
      } else {
        dp[i] = 0;
      }
    }

    max = Math.max(max, dp[i]);
  }

  return max;
}
