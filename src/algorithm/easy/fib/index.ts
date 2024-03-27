
export function fib(n: number): number {
  if (n < 2) {
    return n;
  }

  let pre = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    const sum = pre + cur;
    pre = cur;
    cur = sum;
  }

  return cur;
}
