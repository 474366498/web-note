![树](https://www.bilibili.com/video/BV1j44y1q7k8/?spm_id_from=333.337.search-card.all.click&vd_source=8ddee7f1deaf1d90faf44a79c835fbc8 "Bili bili")

## 二叉树 
1. 一个二叉树第I层的最大项目点数为2**(I-1) i >= 1
2. 深度为K的二叉树有最大节点总数为 2**K - 1 K >=1
3. 对任何非空二叉树T 若n0表示叶节点的个数、n2是度为2的非叶节点个数 那么两者满足关系 n0 = n2 + 1

![二叉树](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/binary-search-tree.png "二叉")


## AVL


## 红黑树
1. 节点是红色或者黑色
2. 根节点是black 
3. 每个叶子节点都是black 的空节点   要自动补齐
4. 每个红色节点的两个子节点都是blank (从每个叶子到根的所有路径上不能有两个连续的 **_红_** 节点)
5. 从根节点到其每个叶子的所有路径都包含相同数目的blank节点


* _a. 从根到叶子的最长可能路径，不会超过最短可能路径的两倍_


![二叉树](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/red-blcnk-tree.png "红黑")




## 红黑树操作-旋转

![旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/rotate.png "旋转")

![左旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/left-rotate.png "左旋转")
1. 逆时针旋转红黑树的两个节点，使得父节点被自己的右子节点取代，而自己成为自己的左子节点
2. 身为右子节点的Y取代了X的位置，而X变成了Y的左子节点


![右旋转](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/right-rotate.png "右旋转")
1. 顺时针旋转红黑树的两个节点，使得父节点被自己的左子节点取代，而自己成为自己的右子节点
2. 身为左子节点的Y取代了X的位置，而X变成了Y的右子节点


## 红黑树操作-插入

![节点简写](https://github.com/474366498/web-note/blob/main/note/%E7%AE%97%E6%B3%95/%E6%A0%91/files/insert.png "简写")
#### 插入的节点默认是 *_红节点_ 

1. 插入到根节点(root=null) newNode => 变换一个颜色
2. 插入到某个节点位置上 节点的父节点是黑色时 直接插入
3. 插入到某个节点位置上 节点的父节点是红色 节点的叔节点是也红色  插入节点为红 => 父节点、叔节点 变换颜色 => 依次递归向上变换颜色
4. 插入到某个节点位置上 节点的父节点是红色 节点的叔节点是黑色    插入节点为红(left) => 父节点转 *_黑_* => G节点转*_红_* => 右旋转
5. 插入到某个节点位置上 节点的父节点是红色 节点的叔节点是黑色    插入节点为红(right) => 以P为根 左旋转 => 将父节点作为新插入的红色节点考虑 => 自己变黑 => G节点变红 => 以G节点为根，进行右旋转










