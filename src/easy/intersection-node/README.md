# 相交链表

## 题目

编写一个程序，找到两个单链表相交的起始节点。

## 思路

创建2个指针， 分别指向2个链表的头节点， 然后同时遍历2个链表， 当其中一个链表遍历到尾部时， 将指针指向另一个链表的头节点， 继续遍历， 当2个指针相等时， 即为相交节点。

## 参考

[leetcode](https://leetcode-cn.com/problems/intersection-of-two-linked-lists)
