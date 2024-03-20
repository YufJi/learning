import { numIslands, numIslandsBfs } from '.';

describe('numIslands', () => {
  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ];

    expect(numIslands(grid)).toBe(1);
  });

  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ];

    expect(numIslands(grid)).toBe(3);
  });

  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '1'],
      ['0', '1', '0'],
      ['1', '1', '1'],
    ];

    expect(numIslands(grid)).toBe(1);
  });
});

describe('numIslandsBfs', () => {
  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ];

    expect(numIslandsBfs(grid)).toBe(1);
  });

  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ];

    expect(numIslandsBfs(grid)).toBe(3);
  });

  it('returns the number of islands', () => {
    const grid = [
      ['1', '1', '1'],
      ['0', '1', '0'],
      ['1', '1', '1'],
    ];

    expect(numIslandsBfs(grid)).toBe(1);
  });
});
