import { myInstanceof } from '.';

describe('myInstanceof', () => {
  test('should return true', () => {
    expect(myInstanceof([], Array)).toBe(true);
    expect(myInstanceof([], Object)).toBe(true);
    expect(myInstanceof([], Function)).toBe(false);
  });
});
