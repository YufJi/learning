import { TreeNode } from '@/algorithm/shared/Tree';

export function maxPathSum(root: TreeNode<number> | null): number {
  let maxSum = Number.MIN_SAFE_INTEGER;

  const dfs = (root: TreeNode<number> | null): number => {
    if (root === null) return 0;

    const left = Math.max(0, dfs(root.left));
    const right = Math.max(0, dfs(root.right));
    
    const innerMaxSum = root.value + left + right;
    maxSum = Math.max(maxSum, innerMaxSum);

    const outerMaxSum = root.value + Math.max(left, right);

    return outerMaxSum;
  };

  dfs(root);

  return maxSum;
}
