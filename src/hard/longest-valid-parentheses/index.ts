
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
