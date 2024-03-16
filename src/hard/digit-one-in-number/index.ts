
export function countDigitOne(n: number): number {
  let count = 0;

  let mulk = 1; // 10^k

  while (n >= mulk) {
    // 大于当前位的部分
    const prev = Math.floor(n / (mulk * 10)) * mulk;
    // 当前位的部分
    const cur = Math.min(Math.max((n % (mulk * 10)) - mulk + 1, 0), mulk);

    count += prev + cur;
    mulk *= 10;
  }

  return count;
}

export function countDigitOneCrude(n: number): number {
  if (n <= 0) return 0;

  let count = 0;

  const getOneCount = (n: number) => {
    let res = 0;
    while (n) {
      if (n % 10 === 1) {
        res++;
      }
      n = Math.floor(n / 10);
    }

    return res;
  };

  for (let i = 1; i <= n; i++) {
    count += getOneCount(i);
  }

  return count;
}
