import { inorderTraversal } from '.';
import { TreeNode } from 'algorithm/shared/Tree';

describe('Inorder Traversal', () => {
  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);

    expect(inorderTraversal(root)).toEqual([1, 3, 2]);
  });

  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);

    expect(inorderTraversal(root)).toEqual([2, 1]);
  });

  it('returns the correct result for a given binary tree', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    expect(inorderTraversal(root)).toEqual([2, 1, 3]);
  });
});
