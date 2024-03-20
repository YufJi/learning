# 翻转二叉树

## 描述

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

示例：

<img src="https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg" alt="img" style="zoom:50%;" />

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```


## 思路

递归交换左右子树即可。**优化一下边界情况的判断，减少递归**。

## 参考

- [leetcode](https://leetcode-cn.com/problems/invert-binary-tree/)
