import { ListNode } from 'algorithm/shared/LinkedList';

export function addTwoNumbers(l1: ListNode<number> | null, l2: ListNode<number> | null): ListNode<number> | null {
  let i = l1;
  let j = l2;

  let head = null;
  let tail = null;

  let carry = 0;

  while (i || j) {
    const sum = (i?.value || 0) + (j?.value || 0) + carry;

    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }

    carry = Math.floor(sum / 10);
    
    i = i ? i.next : null;
    j = j ? j.next : null;
  }

  if (carry > 0) {
    tail.next = new ListNode(carry);
  }

  return head;
}
