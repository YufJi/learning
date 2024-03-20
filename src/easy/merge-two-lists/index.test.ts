import { mergeTwoLists, mergeTwoListsIterative } from '.';
import { ListNode } from '@/shared/LinkedList';

describe('mergeTwoLists', () => {
  test('Test case 1', () => {
    const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
    const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
    const result = mergeTwoLists(l1, l2);
    expect(result?.value).toBe(1);
    expect(result?.next?.value).toBe(1);
    expect(result?.next?.next?.value).toBe(2);
    expect(result?.next?.next?.next?.value).toBe(3);
    expect(result?.next?.next?.next?.next?.value).toBe(4);
    expect(result?.next?.next?.next?.next?.next?.value).toBe(4);
  });

  test('Test case 2', () => {
    const l1 = null;
    const l2 = null;
    const result = mergeTwoLists(l1, l2);
    expect(result).toBeNull();
  });

  test('Test case 3', () => {
    const l1 = null;
    const l2 = new ListNode(0);
    const result = mergeTwoLists(l1, l2);
    expect(result?.value).toBe(0);
  });
});

describe('mergeTwoListsIterative', () => {
  test('Test case 1', () => {
    const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
    const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
    const result = mergeTwoListsIterative(l1, l2);
    expect(result?.value).toBe(1);
    expect(result?.next?.value).toBe(1);
    expect(result?.next?.next?.value).toBe(2);
    expect(result?.next?.next?.next?.value).toBe(3);
    expect(result?.next?.next?.next?.next?.value).toBe(4);
    expect(result?.next?.next?.next?.next?.next?.value).toBe(4);
  });

  test('Test case 2', () => {
    const l1 = null;
    const l2 = null;
    const result = mergeTwoListsIterative(l1, l2);
    expect(result).toBeNull();
  });

  test('Test case 3', () => {
    const l1 = null;
    const l2 = new ListNode(0);
    const result = mergeTwoListsIterative(l1, l2);
    expect(result?.value).toBe(0);
  });
});
