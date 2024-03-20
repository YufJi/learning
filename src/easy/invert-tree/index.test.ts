import { invertTree } from '.';
import { TreeNode } from '@/shared/Tree';

describe('invertTree', () => {
  it('inverts the tree', () => {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(9);

    const inverted = invertTree(root);

    expect(inverted.value).toBe(4);
    expect(inverted.left.value).toBe(7);
    expect(inverted.right.value).toBe(2);
    expect(inverted.left.left.value).toBe(9);
    expect(inverted.left.right.value).toBe(6);
    expect(inverted.right.left.value).toBe(3);
    expect(inverted.right.right.value).toBe(1);
  });

  it('returns null for null input', () => {
    expect(invertTree(null)).toBe(null);
  });

  it('returns the same node for a single node tree', () => {
    const root = new TreeNode(1);
    expect(invertTree(root)).toBe(root);
  });
});
