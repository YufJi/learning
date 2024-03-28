
export function strStr(a: string, b:string): number {
  if (b.length === 0) return 0;
  if (b.length > a.length) return -1;

  let i = 0;
  let j = b.length;

  while (i <= a.length - b.length) {
    if (a.slice(i, j) === b) {
      return i;
    }

    i++;
    j++;
  }

  return -1;
}
