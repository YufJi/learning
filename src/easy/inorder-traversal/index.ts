import { TreeNode } from '@/shared/Tree';

export function inorderTraversal<T>(root: TreeNode<T> | null): T[] {
  const result = [];

  const traverse = (node: TreeNode<T>) => {
    if (!node) return;

    traverse(node.left);
    result.push(node.value);
    traverse(node.right);
  };

  traverse(root);

  return result;
}
