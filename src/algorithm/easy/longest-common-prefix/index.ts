
export function longestCommonPrefix(strs: string[]) {
  let prefix = strs[0] || '';

  for (let i = 1; i < strs.length; i++) {
    let reg = new RegExp(`^${prefix}`);

    while (prefix && !reg.test(strs[i])) {
      prefix = prefix.slice(0, prefix.length - 1);
      reg = new RegExp(`^${prefix}`);
    }
  }

  return prefix;
}
