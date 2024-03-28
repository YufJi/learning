import { reverse } from '.';

describe('reverse', () => {
  it('should reverse the given number', () => {
    expect(reverse(123)).toBe(321);
    expect(reverse(-123)).toBe(-321);
    expect(reverse(120)).toBe(21);
    expect(reverse(0)).toBe(0);
    expect(reverse(1534236469)).toBe(0);
  });
});
