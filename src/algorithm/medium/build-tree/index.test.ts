import { buildTree } from '.';
import { TreeNode } from '@/algorithm/shared/Tree';

describe('buildTree', () => {
  it('returns the correct tree', () => {
    const preOrder = [3, 9, 20, 15, 7];
    const inOrder = [9, 3, 15, 20, 7];
    const expected = new TreeNode(3);
    expected.left = new TreeNode(9);
    expected.right = new TreeNode(20);
    expected.right.left = new TreeNode(15);
    expected.right.right = new TreeNode(7);
    
    expect(buildTree(preOrder, inOrder)).toEqual(expected);
  });
});
