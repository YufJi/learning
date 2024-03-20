// 邻接矩阵表示图
export class GraphByMatrix {
  private vertices: number[];
  private matrix: number[][];

  constructor(vertices: number[]) {
    this.vertices = vertices;
    this.matrix = Array.from({ length: vertices.length }, () => Array(vertices.length).fill(0));
  }

  size() {
    return this.vertices.length;
  }

  // 添加边
  addEdge(v1: number, v2: number) {
    this.matrix[v1][v2] = 1;
    this.matrix[v2][v1] = 1;
  }

  // 移除边
  removeEdge(v1: number, v2: number) {
    this.matrix[v1][v2] = 0;
    this.matrix[v2][v1] = 0;
  }

  // 添加顶点
  addVertex(n: number) {
    this.vertices.push(n);

    this.matrix.push(Array(this.size()).fill(0));
    this.matrix.forEach(row => row.push(0));
  }

  // 移除顶点
  removeVertex(v: number) {
    const index = this.vertices.indexOf(v);
    if (index === -1) return;

    this.vertices.splice(index, 1);

    this.matrix.splice(index, 1);
    this.matrix.forEach(row => row.splice(index, 1));
  }
}
