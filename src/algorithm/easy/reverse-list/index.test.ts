import { reverseList, reverseListRecursive } from '.';
import { ListNode } from 'algorithm/shared/LinkedList';

describe('reverseList', () => {
  test('Test case 1', () => {
    const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

    const result = reverseList(head);

    expect(result?.value).toBe(5);
    expect(result?.next?.value).toBe(4);
    expect(result?.next?.next?.value).toBe(3);
    expect(result?.next?.next?.next?.value).toBe(2);
    expect(result?.next?.next?.next?.next?.value).toBe(1);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });

  test('Test case 2', () => {
    const head = new ListNode(1, new ListNode(2));

    const result = reverseList(head);

    expect(result?.value).toBe(2);
    expect(result?.next?.value).toBe(1);
    expect(result?.next?.next).toBeNull();
  });

  test('Test case 3', () => {
    const head = new ListNode(1);

    const result = reverseList(head);

    expect(result?.value).toBe(1);
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

    const result = reverseListRecursive(head);

    expect(result?.value).toBe(5);
    expect(result?.next?.value).toBe(4);
    expect(result?.next?.next?.value).toBe(3);
    expect(result?.next?.next?.next?.value).toBe(2);
    expect(result?.next?.next?.next?.next?.value).toBe(1);
    expect(result?.next?.next?.next?.next?.next).toBeNull();
  });

  test('Test case 2', () => {
    const head = new ListNode(1, new ListNode(2));

    const result = reverseListRecursive(head);

    expect(result?.value).toBe(2);
    expect(result?.next?.value).toBe(1);
    expect(result?.next?.next).toBeNull();
  });

  test('Test case 3', () => {
    const head = new ListNode(1);

    const result = reverseListRecursive(head);

    expect(result?.value).toBe(1);
    expect(result?.next).toBeNull();
  });

  test('Test case 4', () => {
    const head = null;

    const result = reverseListRecursive(head);

    expect(result).toBeNull();
  });
});
