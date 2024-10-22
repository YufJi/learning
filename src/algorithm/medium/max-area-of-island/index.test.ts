import { maxAreaOfIsland } from '.';

describe('Test maxAreaOfIsland', () => {
  test('grid = [[0,0,0,0,0,0,0,0]]', () => {
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])).toBe(0);
  });

  test('grid = [[0,0,0,0,0,0,0,1]]', () => {
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 1]])).toBe(1);
  });

  test('grid = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1]]', () => {
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 1]])).toBe(2);
  });

  test('grid = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1]]', () => {
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 1]])).toBe(3);
  });
});
