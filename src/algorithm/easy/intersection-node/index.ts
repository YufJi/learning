import { ListNode } from 'algorithm/shared/LinkedList';

export function getIntersectionNode<T>(headA: ListNode<T> | null, headB: ListNode<T> | null): ListNode<T> | null {
  let a = headA;
  let b = headB;

  while (a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }

  return a; // or b
}
