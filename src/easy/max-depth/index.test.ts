import { maxDepth } from '.';
import { TreeNode } from '@/shared/Tree';

describe('maxDepth', () => {
  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);

    expect(maxDepth(root)).toBe(3);
  });

  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);

    expect(maxDepth(root)).toBe(2);
  });

  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    expect(maxDepth(root)).toBe(2);
  });

  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.right.right.right = new TreeNode(7);

    expect(maxDepth(root)).toBe(4);
  });
});
