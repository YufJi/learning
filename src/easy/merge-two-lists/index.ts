import { ListNode } from '@/shared/LinkedList';

export function mergeTwoLists(l1: ListNode<number> | null, l2: ListNode<number> | null): ListNode<number> | null {
  if (!l1) {
    return l2;
  } else if (!l2) {
    return l1;
  } else if (l1.value < l2.value) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}

export function mergeTwoListsIterative(l1: ListNode<number> | null, l2: ListNode<number> | null): ListNode<number> | null {
  let prehead = new ListNode(-1);
  let tail = prehead;

  while (l1 && l2) {
    if (l1.value < l2.value) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    
    tail = tail.next;
  }

  tail.next = l1 || l2;
  
  return prehead.next;
}
