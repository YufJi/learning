import { TreeNode } from '@/algorithm/shared/Tree';

export function buildTree(preOrder: number[], inOrder: number[]) {
  const map = new Map<number, number>();
  inOrder.forEach((val, index) => {
    map.set(val, index);
  });

  const genTree = (p, pStart, pEnd, i, iStart, iEnd) => { 
    if (pStart > pEnd) {
      return null;
    }

    const rootVal = p[pStart];
    const root = new TreeNode(rootVal);

    if (pStart === pEnd) {
      return root;
    }

    const rootIndex = map.get(rootVal);
    const leftNodes = rootIndex - iStart;
    const rightNodes = iEnd - rootIndex;
    root.left = genTree(p, pStart + 1, pStart + leftNodes, i, iStart, rootIndex - 1);
    root.right = genTree(p, pEnd - rightNodes + 1, pEnd, i, rootIndex + 1, iEnd);

    return root;
  };

  return genTree(preOrder, 0, preOrder.length - 1, inOrder, 0, inOrder.length - 1);
}
