import { ListNode } from './ListNode';

/**
 * 用链表实现栈
 */
export class LinkedListStack {
  private head: ListNode | null = null;
  private size: number = 0;

  push(val: number) {
    const node = new ListNode(val);
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

export class Stack<T> {
  private items: Array<T> = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

