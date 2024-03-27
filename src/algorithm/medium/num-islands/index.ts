import { Queue } from 'algorithm/shared/Queue';

export function numIslands(grid: string[][]): number {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const dfs = (r: number, c: number) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }

    grid[r][c] = '0';

    dfs(r - 1, c); // up
    dfs(r + 1, c); // down
    dfs(r, c - 1); // left
    dfs(r, c + 1); // right
  };

  let r = 0;
  let c = 0;

  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

export function numIslandsBfs(grid: string[][]): number {
  let count = 0;
  const queue = new Queue<string>();
  const visited = new Set<string>();

  const bfs = (r: number, c: number) => {
    while (!queue.isEmpty()) {
      const [row, col] = queue.dequeue().split('-').map(Number);

      // right
      if (col + 1 < grid[0].length && grid[row][col + 1] === '1' && !visited.has(`${row}-${col + 1}`)) {
        queue.enqueue(`${row}-${col + 1}`);
        visited.add(`${row}-${col + 1}`);

        grid[row][col + 1] = '0';
      }

      // down
      if (row + 1 < grid.length && grid[row + 1][col] === '1' && !visited.has(`${row + 1}-${col}`)) {
        queue.enqueue(`${row + 1}-${col}`);
        visited.add(`${row + 1}-${col}`);

        grid[row + 1][col] = '0';
      }

      // left
      if (col - 1 >= 0 && grid[row][col - 1] === '1' && !visited.has(`${row}-${col - 1}`)) {
        queue.enqueue(`${row}-${col - 1}`);
        visited.add(`${row}-${col - 1}`);

        grid[row][col - 1] = '0';
      }

      // up
      if (row - 1 >= 0 && grid[row - 1][col] === '1' && !visited.has(`${row - 1}-${col}`)) {
        queue.enqueue(`${row - 1}-${col}`);
        visited.add(`${row - 1}-${col}`);

        grid[row - 1][col] = '0';
      }
    }
  };

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1' && !visited.has(`${r}-${c}`)) {
        count++;

        queue.enqueue(`${r}-${c}`);
        visited.add(`${r}-${c}`);

        grid[r][c] = '0';

        bfs(r, c);
      }
    }
  }

  return count;
}
