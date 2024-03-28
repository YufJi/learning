import { removeElement } from '.';

describe('removeElement', () => {
  it('should remove the target element from the given array', () => {
    expect(removeElement([3, 2, 2, 3], 3)).toBe(2);
    expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toBe(5);
  });
});
