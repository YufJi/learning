class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T, next: Node<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  push(val: T) {
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  pop() {
    if (this.head === null) return;

    const val = this.head.val;
    this.head = this.head.next;
    this.size--;

    return val;
  }

  peek() {
    return this.head?.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

