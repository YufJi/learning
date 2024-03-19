import { ListNode } from '@/shared/LinkedList';

export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev = null;
  let cur = head;

  while (cur !== null) {
    const next = cur.next;
    // Reverse the link
    cur.next = prev;
  
    // Move to the next node
    prev = cur;
    cur = next;
  }

  return prev;
}

export function reverseListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
  if (head === null || head.next === null) {
    return head;
  }

  const p = reverseListRecursive(head.next);
  // Reverse the link
  head.next.next = head;
  // Break the link
  head.next = null;

  return p;
}
