import { addTwoNumbers } from '.';
import {ListNode } from '@/shared/LinkedList';

describe('addTwoNumbers', () => {
  test('Test case 1', () => {
    const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
    const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

    const result = addTwoNumbers(l1, l2);

    expect(result?.value).toBe(7);
    expect(result?.next?.value).toBe(0);
    expect(result?.next?.next?.value).toBe(8);
    expect(result?.next?.next?.next).toBeNull();
  });

  test('Test case 2', () => {
    const l1 = new ListNode(0);
    const l2 = new ListNode(0);

    const result = addTwoNumbers(l1, l2);

    expect(result?.value).toBe(0);
    expect(result?.next).toBeNull();
  });
});
