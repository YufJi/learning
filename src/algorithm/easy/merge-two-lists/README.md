# 合并两个有序链表

## 描述

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

<img src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" width="300" />

```txt
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```


## 思路

1. 递归， 比较两个链表的头节点，将较小的节点作为当前节点，然后递归调用函数，将较小节点的next指针指向递归调用的结果。

2. 迭代，创建一个新的链表，然后比较两个链表的头节点，将较小的节点作为当前节点，然后将较小节点的next指针指向较小节点的next节点，然后将较小节点的next指针指向新链表的next节点。

## 参考

- [leetcode](https://leetcode-cn.com/problems/merge-two-sorted-lists)
