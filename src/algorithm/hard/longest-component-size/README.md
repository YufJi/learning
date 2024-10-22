# 按公因数计算最大组件大小

## 描述

给定一个由不同正整数的组成的非空数组 nums ，考虑下面的图：

有 nums.length 个节点，按从 nums[0] 到 nums[nums.length - 1] 标记；
只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j]之间才有一条边。

找出具有最大边数的组件的大小。

## 思路

使用并查集，遍历数组，对每个数进行因数分解，将因数与当前数进行合并，最后返回并查集中最大的集合的大小。



## 参考

[leetcode](https://leetcode-cn.com/problems/largest-component-size-by-common-factor/)
