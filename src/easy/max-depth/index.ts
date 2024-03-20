import { TreeNode } from '@/shared/Tree';

export function maxDepth<T>(root: TreeNode<T> | null, parentDepth: number = 0): number {
  if (!root) {
    return parentDepth;
  }

  const leftDepth = maxDepth(root.left, parentDepth + 1);
  const rightDepth = maxDepth(root.right, parentDepth + 1);

  return Math.max(leftDepth, rightDepth);
}
