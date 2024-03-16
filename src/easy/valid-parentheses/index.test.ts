import { validParentheses } from '.';

describe('validParentheses', () => {
  it('returns true for valid parentheses', () => {
    expect(validParentheses('()')).toBe(true);
    expect(validParentheses('()[]{}')).toBe(true);
    expect(validParentheses('{[]}')).toBe(true);
  });

  it('returns false for invalid parentheses', () => {
    expect(validParentheses('(]')).toBe(false);
    expect(validParentheses('([)]')).toBe(false);
    expect(validParentheses(']')).toBe(false);
  });
});
