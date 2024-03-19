import { getIntersectionNode } from '.';
import { ListNode } from '@/shared/LinkedList';

describe('getIntersectionNode', () => {
  it('returns the intersection node', () => {
    const headA = new ListNode(4, new ListNode(1, new ListNode(8, new ListNode(4, new ListNode(5)))));
    const headB = new ListNode(5, new ListNode(0, new ListNode(1, headA.next.next)));
    expect(getIntersectionNode(headA, headB)).toBe(headA.next.next);
  });

  it('returns null if there is no intersection', () => {
    const headA = new ListNode(2, new ListNode(6, new ListNode(4)));
    const headB = new ListNode(1, new ListNode(5));
    expect(getIntersectionNode(headA, headB)).toBeNull();
  });

  it('returns the intersection node', () => {
    const headA = new ListNode(1, new ListNode(9, new ListNode(1, new ListNode(2, new ListNode(4)))));
    const headB = new ListNode(3, headA.next.next.next);
    expect(getIntersectionNode(headA, headB)).toBe(headA.next.next.next);
  });

  it('returns null if there is no intersection', () => {
    const headA = null;
    const headB = new ListNode(1, new ListNode(5));
    expect(getIntersectionNode(headA, headB)).toBeNull();
  });
});
