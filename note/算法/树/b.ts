// https://www.cnblogs.com/bzwww/p/13306028.html

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

const BalanceFactor = {
  UNBALANCED_LEET: 1,
  SLIGHTLY_UNBALANCED_LEET: 2,
  BALANCED: 3,
  UNBALANCED_RIGHT: 4,
  SLIGHTLY_UNBALANCED_RIGHT: 5
}

function defaultCompare(a: string, b: string): number {
  return a === b ? Compare.EQUALS : ((a < b) ? Compare.LESS_THAN : Compare.BIGGER_THAN)
}

const Colors = {
  R: 0,
  B: 1
}
type RBNodeType = {
  left: RBNode | null,
  right: RBNode | null,
  color: number,
  parent: RBNode | null,
  key: any
}
class RBNode {
  // public left = null
  // public right = null
  // public color = Colors.R
  // public parent = null
  left: RBNode | null
  right: RBNode | null
  color: number
  parent: RBNode | null
  key: any
  constructor(key: any) {
    this.left = null
    this.right = null
    this.color = Colors.R
    this.parent = null
    this.key = key
  }
}

class RedBlankTree {
  compareFn: Function
  root: RBNode | null
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }
  insert(key: any) {
    if (!this.root) {
      this.root = new RBNode(key)
      this.root.color = Colors.B
    } else {
      const newNode = this.insertNode(this.root, key) as RBNode
      // console.log(64, key, newNode)
      this.fixTreeProperties(newNode)
    }
  }
  insertNode(node: RBNodeType, key: any) {
    if (this.compareFn(key, node!.key) === Compare.LESS_THAN) {
      if (!node.left) {
        node.left = new RBNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    }
    else {
      if (!node.right) {
        node.right = new RBNode(key)
        node.right.parent = node
        return node.right
      } else {
        return this.insertNode(node.right, key)
      }
    }
  }
  fixTreeProperties(node: RBNode) {
    while (node && node.parent && node.parent.color === Colors.R && node.color != Colors.B) {
      let P: RBNode = node.parent
      let G: RBNode = P.parent
      //如果父节点是祖节点的左子节点
      if (G && G.left == P) {
        let U: RBNode = G.right
        // 父节点存在 并是红色
        if (U && U.color === Colors.R) {
          G.color = Colors.R
          P.color = Colors.B
          U.color = Colors.B
          node = G
        } else { // 如果叔节点的颜色为黑色 也可能是个null黑节点
          if (node == P.right) {
            this.rotationRR(P)
            node = P
            P = node.parent
          }
          //新节点位于父节点的左边
          this.rotationLL(G)
          P.color = Colors.B
          G.color = Colors.R
          node = P
        }
      } else {
        let U: RBNode = G.left
        if (U && U.color !== Colors.B) {
          G.color = Colors.R
          P.color = Colors.B
          U.color = Colors.B
          node = G
        } else {
          if (node === P.left) {
            this.rotationLL(P)
            node = P
            P = node.parent
          }
          this.rotationRR(G)
          P.color = Colors.B
          G.color = Colors.R
          node = P
        }
      }
    }
    this.root.color = Colors.B
  }

  // 右旋转
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      if (node == node.parent.left) {
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }
  rotationLL(node) {
    //获取父节点的左子节点
    const tmp = node.left;
    //父节点的左子节点指向tmp的右子节点
    node.left = tmp.right;
    //如果tmp的左子节点存在
    if (tmp.right && tmp.right.key) {
      //tmp的右子节点的父亲指向父节点
      tmp.right.parent = node;
    }
    //tmp指向父节点的父亲;
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      //判断父节点是祖节点的左节点还是右节点
      if (node == node.parent.left) {
        //祖节点的左子节点是tmp
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    //父节点成为tmp的右子节点
    tmp.right = node;
    //父节点的父亲是tmp
    node.parent = tmp;
  }
  preOrderTraverse(fn?: Function) {
    this.preOrderTraverseNode(this.root, fn ? fn : null)
  }
  preOrderTraverseNode(node: RBNode | null, fn: Function | null) {
    if (node) {
      fn && fn(node)
      this.preOrderTraverseNode(node.left, fn ? fn : null)
      this.preOrderTraverseNode(node.right, fn ? fn : null)
    } else {
      return
    }
  }

}

let t = new RedBlankTree()

for (let i = 10; i > 2; i--) {
  t.insert(i)
}

// t.preOrderTraverse(item => {
//   console.log(206, item.color, item.key)
// })






