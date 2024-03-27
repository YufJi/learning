import { TreeNode } from 'algorithm/shared/Tree';

export function isSymmetric<T>(root: TreeNode<T> | null): boolean {
  const isMirror = (left: TreeNode<T> | null, right: TreeNode<T> | null): boolean => {
    if (!left && !right) return true;
    if (!left || !right) return false;
    
    return left.value === right.value && isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  return isMirror(root, root);
}
