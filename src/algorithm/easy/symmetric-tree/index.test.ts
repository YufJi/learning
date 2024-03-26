import { isSymmetric } from '.';
import { TreeNode } from 'algorithm/shared/Tree';

describe('isSymmetric', () => {
  test('Test case 1', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);

    expect(isSymmetric(root)).toBe(true);
  });

  test('Test case 2', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.right = new TreeNode(3);
    root.right.right = new TreeNode(3);

    expect(isSymmetric(root)).toBe(false);
  });

  test('Test case 3', () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(2);
    root.right.left = new TreeNode(2);

    expect(isSymmetric(root)).toBe(false);
  });
});
