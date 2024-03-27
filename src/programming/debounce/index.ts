export function debounce(fn, delay) {
  let timer = null;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
