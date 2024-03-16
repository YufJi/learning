import { Stack } from '@/shared/Stack';

export function validParentheses(s: string) {
  const stack = new Stack<string>();
  const pairs = new Map<string, string>([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  for (const char of s) {
    if (pairs.has(char)) {
      if (stack.peek() !== pairs.get(char)) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.isEmpty();
}
