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
      //??????????????????????????????????????????
      if (G && G.left == P) {
        let U: RBNode = G.right
        // ??????????????? ????????????
        if (U && U.color === Colors.R) {
          G.color = Colors.R
          P.color = Colors.B
          U.color = Colors.B
          node = G
        } else { // ????????????????????????????????? ???????????????null?????????
          if (node == P.right) {
            this.rotationRR(P)
            node = P
            P = node.parent
          }
          //?????????????????????????????????
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

  // ?????????
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
    //??????????????????????????????
    const tmp = node.left;
    //??????????????????????????????tmp???????????????
    node.left = tmp.right;
    //??????tmp?????????????????????
    if (tmp.right && tmp.right.key) {
      //tmp???????????????????????????????????????
      tmp.right.parent = node;
    }
    //tmp????????????????????????;
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    } else {
      //??????????????????????????????????????????????????????
      if (node == node.parent.left) {
        //???????????????????????????tmp
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }
    //???????????????tmp???????????????
    tmp.right = node;
    //?????????????????????tmp
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






