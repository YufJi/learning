export function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let maxArea = 0;

  const dfs = (i: number, j: number): number => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0;
    }

    grid[i][j] = 0;
    let area = 1;
    area += dfs(i + 1, j);
    area += dfs(i - 1, j);
    area += dfs(i, j + 1);
    area += dfs(i, j - 1);

    return area;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      maxArea = Math.max(maxArea, dfs(i, j));
    }
  }

  return maxArea;
}
