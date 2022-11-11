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


* _a. 从根到叶子的最长可能路径，不会超过最短可能路径的两倍_


![二叉树](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/red-blcnk-tree.png "红黑")




## 红黑树操作

![旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/rotate.png "旋转")

![左旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/left-rotate.png "左旋转")
1. 逆时针旋转红黑树的两个节点，使得父节点被自己的右子节点取代，而自己成为自己的左子节点
2. 身为右子节点的Y取代了X的位置，而X变成了Y的左子节点


![右旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/right-rotate.png "右旋转")
1. 顺时针旋转红黑树的两个节点，使得父节点被自己的左子节点取代，而自己成为自己的右子节点
2. 身为左子节点的Y取代了X的位置，而X变成了Y的右子节点













