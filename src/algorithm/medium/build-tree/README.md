# 重建二叉树

## 描述

给定前序遍历和中序遍历，构建二叉树。

```text
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]
解释:
    3
   / \
  9  20
    /  \
   15   7
```

## 思路

1. 前序遍历的第一个元素是根节点

2. 在中序遍历中找到根节点的位置，左边是左子树，右边是右子树

3. 递归构建左子树和右子树

## 参考

[leetcode](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
