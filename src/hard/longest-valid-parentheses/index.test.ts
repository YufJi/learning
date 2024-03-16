import { longestValidParentheses, longestValidParenthesesDp } from '.';

describe('hard/longestValidParentheses', () => {
  it('should get longestValidParentheses', () => {
    expect(longestValidParentheses('(()')).toBe(2);
    expect(longestValidParentheses(')()())')).toBe(4);
    expect(longestValidParentheses('')).toBe(0);
    expect(longestValidParentheses('()(()')).toBe(2);
    expect(longestValidParentheses('())((())))')).toBe(6);
  });

  it('should get longestValidParenthesesDp', () => {
    expect(longestValidParenthesesDp('(()')).toBe(2);
    expect(longestValidParenthesesDp(')()())')).toBe(4);
    expect(longestValidParenthesesDp('')).toBe(0);
    expect(longestValidParenthesesDp('()(()')).toBe(2);
    expect(longestValidParenthesesDp('())((())))')).toBe(6);
  });
});
