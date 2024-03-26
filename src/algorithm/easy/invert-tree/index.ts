import { TreeNode } from 'algorithm/shared/Tree';

export function invertTree<T>(root: TreeNode<T> | null): TreeNode<T> | null {
  if (!root) {
    return null;
  }

  if (!root.left && !root.right) {
    return root;
  }

  const left = root.left;
  const right = root.right;

  root.left = right !== null ? invertTree(right) : null;
  root.right = left !== null ? invertTree(left) : null;

  return root;
}
