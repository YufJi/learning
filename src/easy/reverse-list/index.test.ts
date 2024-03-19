import { reverseList } from '.';
import { ListNode } from '@/shared/LinkedList';

describe('reverseList', () => {
  test('Test case 1', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

    const result = reverseList(head);

    expect(result?.val).toBe(5);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.val).toBe(2);
    expect(result?.next?.next?.next?.next?.val).toBe(1);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });

  test('Test case 2', () => {
    const head = new ListNode(1, new ListNode(2));

    const result = reverseList(head);

    expect(result?.val).toBe(2);
    expect(result?.next?.val).toBe(1);
    expect(result?.next?.next).toBeNull();
  });

  test('Test case 3', () => {
    const head = new ListNode(1);

    const result = reverseList(head);

    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  test('Test case 4', () => {
    const head = null;

    const result = reverseList(head);

    expect(result).toBeNull();
  });
});

describe('reverseListRecursive', () => {
  test('Test case 1', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

    const result = reverseList(head);

    expect(result?.val).toBe(5);
    expect(result?.next?.val).toBe(4);
    expect(result?.next?.next?.val).toBe(3);
    expect(result?.next?.next?.next?.val).toBe(2);
    expect(result?.next?.next?.next?.next?.val).toBe(1);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });

  test('Test case 2', () => {
    const head = new ListNode(1, new ListNode(2));

    const result = reverseList(head);

    expect(result?.val).toBe(2);
    expect(result?.next?.val).toBe(1);
    expect(result?.next?.next).toBeNull();
  });

  test('Test case 3', () => {
    const head = new ListNode(1);

    const result = reverseList(head);

    expect(result?.val).toBe(1);
    expect(result?.next).toBeNull();
  });

  test('Test case 4', () => {
    const head = null;

    const result = reverseList(head);

    expect(result).toBeNull();
  });
});
