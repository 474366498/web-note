## 二叉树 
1. 一个二叉树第I层的最大项目点数为2**(I-1) i >= 1
2. 深度为K的二叉树有最大节点总数为 2**K - 1 K >=1
3. 对任何非空二叉树T 若n0表示叶节点的个数、n2是度为2的非叶节点个数 那么两者满足关系 n0 = n2 + 1

![二叉树](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/binary-search-tree.png "二叉")


## 红黑树
1. 节点是红色或者黑色
2. 根节点是black 
3. 每个叶子节点都是black 的空节点   要自动补齐
4. 每个红色节点的两个子节点都是blank (从每个叶子到根的所有路径上不能有两个连续的红节点)
5. 从根节点到其每个叶子的所有路径都包含相同数目的blank节点

![二叉树](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/red-blcnk-tree.png "红黑")


















