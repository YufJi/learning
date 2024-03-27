export class Queue<T> {
  private items: Array<T> = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
