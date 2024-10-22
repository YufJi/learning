import { maxPathSum } from '.';

describe('Test maxPathSum', () => {
  test('root = [1,2,3]', () => {
    expect(maxPathSum({
      value: 1,
      left: { value: 2, left: null, right: null },
      right: { value: 3, left: null, right: null },
    })).toBe(6);
  });

  test('root = [-10,9,20,null,null,15,7]', () => {
    expect(maxPathSum({
      value: -10,
      left: { value: 9, left: null, right: null },
      right: {
        value: 20,
        left: { value: 15, left: null, right: null },
        right: { value: 7, left: null, right: null },
      },
    })).toBe(42);
  });

  test('root = [1,2]', () => {
    expect(maxPathSum({
      value: 1,
      left: { value: 2, left: null, right: null },
      right: null,
    })).toBe(3);
  });
});  
