import { fib } from '.';

describe('fib', () => {
  it('should return the nth number in the fibonacci sequence', () => {
    expect(fib(6)).toBe(8);
    expect(fib(10)).toBe(55);
    expect(fib(20)).toBe(6765);
    expect(fib(30)).toBe(832040);
  });
});
