export function throttle(fn, delay) {
  let last = 0;

  return function(...args) {
    const now = Date.now();

    if (now - last > delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
