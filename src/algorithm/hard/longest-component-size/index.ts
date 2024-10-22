
export function largestComponetSize(nums: number[]): number {
  const max = Math.max(...nums);
  const uf = new UnionFind(max + 1);

  for (const num of nums) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        uf.union(num, i);
        uf.union(num, num / i);
      }
    }
  }

  const map = new Map<number, number>();
  let maxCount = 0;
  for (const num of nums) {
    const root = uf.find(num);
    map.set(root, (map.get(root) || 0) + 1);
    maxCount = Math.max(maxCount, map.get(root)!);
  }

  return maxCount;
}

class UnionFind {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array.from({ length: n }, () => 0);
  }
  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
}
