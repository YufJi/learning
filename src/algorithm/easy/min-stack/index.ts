import { Stack } from 'algorithm/shared/Stack';

export class GetMinStack {
  private stackData: Stack<number>;
  private stackMin: Stack<number>;

  constructor() {
    this.stackData = new Stack();
    this.stackMin = new Stack();
  }

  push(x: number) {
    this.stackData.push(x);
    if (this.stackMin.isEmpty() || x <= this.stackMin.peek()) {
      this.stackMin.push(x);
    }
  }

  pop() {
    const value = this.stackData.pop();
    if (value === this.stackMin.peek()) {
      this.stackMin.pop();
    }
    return value;
  }

  getMin() {
    return this.stackMin.peek();
  }
}
