export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private size: number = 0;

  push(value: T) {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  pop() {
    if (this.head === null) return;

    const value = this.head.value;
    this.head = this.head.next;
    this.size--;

    return value;
  }

  peek() {
    return this.head?.value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

