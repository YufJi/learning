import { longestValidParentheses } from '.';

describe('hard/longestValidParentheses', () => {
  it('should get longestValidParentheses', () => {
    expect(longestValidParentheses('(()')).toBe(2);
    expect(longestValidParentheses(')()())')).toBe(4);
    expect(longestValidParentheses('')).toBe(0);
    expect(longestValidParentheses('()(()')).toBe(2);
    expect(longestValidParentheses('())((())))')).toBe(6);
  });
});
