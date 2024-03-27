import { debounce } from '.';

describe('debounce', () => {
  it('should debounce a function', () => {
    let count = 0;
    const increment = () => count++;
    const debouncedIncrement = debounce(increment, 100);

    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();

    expect(count).toEqual(0);

    setTimeout(() => {
      expect(count).toEqual(1);
    }, 200);
  });
});
