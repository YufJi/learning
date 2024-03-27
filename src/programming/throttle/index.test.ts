import { throttle } from '.';

describe('throttle', () => {
  it('should throttle a function', () => {
    let count = 0;
    const increment = () => count++;
    const throttledIncrement = throttle(increment, 100);

    throttledIncrement();
    throttledIncrement();
    throttledIncrement();

    expect(count).toEqual(1);
  });
});
