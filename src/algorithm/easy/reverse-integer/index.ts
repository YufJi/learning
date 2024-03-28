
export function reverse(num: number): number {
  const MIN = -Math.pow(2, 31);
  const MAX = Math.pow(2, 31) - 1;

  let result = 0;

  while (num !== 0) {
    result = result * 10 + num % 10;
    num = num > 0 ? Math.floor(num / 10) : Math.ceil(num / 10);
  }

  if (result < MIN || result > MAX) {
    return 0;
  }

  return result;
}
