



// BinarySearchTree 


class BSNode {
  public left = null
  public right = null
  key: number
  constructor(key: number) {
    this.key = key
  }
}


class BinarySearchTree {
  root: BSNode | null
  constructor() {
    this.root = null
  }

  insert(data: number) {
    let newNode = new BSNode(data)
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  insertNode(node: any, newNode: any) {
    if (newNode.key < node.key) { // left
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  search(key: any) {
    return this.searchNode(this.root, key)
  }
  searchNode(node: BSNode | null, key: any) {
    while (node) {
      if (node.key === key) {
        return node
      } else {
        node = key < node.key ? node.left : node.right
      }
    }
    return false
  }
  // inOrderTraverse
  // 先序遍历
  preOrderTraverse(fn?: Function) {
    this.preOrderTraverseNode(this.root, fn ? fn : null)
  }
  preOrderTraverseNode(node: BSNode | null, fn: Function | null) {
    if (node) {
      // console.log(55, node.key)
      // this.preOrderTraverseNode(node)
      fn && fn(node)
      this.preOrderTraverseNode(node.left, fn ? fn : null)
      this.preOrderTraverseNode(node.right, fn ? fn : null)
    } else {
      return false
    }
  }
  // 后序遍历
  postOrderTraverse(fn?: Function) {
    this.postOrderTraverseNode(this.root, fn ? fn : null)
  }
  postOrderTraverseNode(node: BSNode | null, fn: Function | null) {
    if (!node) return
    this.postOrderTraverseNode(node.left, fn ? fn : null)
    this.postOrderTraverseNode(node.right, fn ? fn : null)
    fn && fn(node)
  }
  // 中序遍历
  middleOrderTraverse(fn?: Function) {
    this.middleOrderTraverseNode(this.root, fn ? fn : null)
  }
  middleOrderTraverseNode(node: BSNode | null, fn: Function | null) {
    if (!node) return
    this.middleOrderTraverseNode(node.left, fn || null)
    fn && fn(node)
    this.middleOrderTraverseNode(node.right, fn || null)
  }
  min() {
    let node = this.root
    while (!!node!.left) {
      node = node!.left
    }
    return node!.key
  }
  max() {
    let node = this.root
    while (!!node!.right) {
      node = node!.right
    }
    return node!.key
  }
  remove(key: any) {
    let parent = this.root,
      current = this.root,
      isLeft = false
    while (current!.key !== key) {
      parent = current
      if (key < current!.key) {
        isLeft = true
        current = current!.left
      } else {
        isLeft = false
        current = current!.right
      }
      if (!current) return false
    }
    // console.log(125, parent, current, isLeft)

    if (!current!.left && !current!.right) {  // 叶子
      if (current === this.root) {
        this.root = null
      } else if (isLeft) {
        parent!.left = null
      } else {
        parent!.right = null
      }
    } else if (current!.left && current!.right) { // 左右都有    提一个上去替换 提左 找右
      let successor: any = this.getSuccessor(current)
      console.log(137, successor, isLeft, parent!.left)
      if (!parent) return
      if (current === this.root) {
        this.root = successor
      } else if (isLeft) {
        parent!.left = successor
      } else {
        parent!.right = successor
      }

    } else if (current!.left) {   // 只有左节点
      if (current === this.root) {
        this.root = current!.left
      } else if (isLeft) {
        parent!.left = current!.left
      } else {
        parent!.right = current!.left
      }
    } else if (current!.right) {   // 只有右节点
      if (current = this.root) {
        this.root = current!.right
      } else if (isLeft) {
        parent!.left = current!.right
      } else {
        parent!.right = current!.right
      }
    }
  }

  getSuccessor(delNode: BSNode | null) {
    let successor = delNode,
      current = delNode!.right || null,
      successorP = delNode
    while (current != null) {
      successorP = successor
      successor = current
      current = current['left']
    }
    if (successor != delNode!.right) {
      successorP!.left = successor!.right
      successor!.right = delNode!.right
    }
    return successor
  }
}

let t = new BinarySearchTree()
let arr = [67, 10, 7, 8, 234, 4, 213, 123, 217, 56, 13, 58, 255, 250, 259, 270]
arr.forEach(item => {
  t.insert(item)
})
// for (let i = 0; i < 10; i++) {
//   t.insert(i)
// }
// for (let i = 11; i < 20; i++) {
//   t.insert(i)
// }

// t.preOrderTraverse((item: BSNode) => {
//   console.log(923, item.key)
// })

// t.postOrderTraverse((item: BSNode) => {
//   console.log(107, item.key)
// })
t.middleOrderTraverse((item: BSNode) => {
  console.log(120, item.key)
})

console.log(t)

t.remove(7)

t.preOrderTraverse((item: BSNode) => {
  console.log('remove after', item.key)
})







let arr1: any = [
  [1, 9, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
  [2, 8, 12, 18, 22],
  [3, 7, 12, 13, 14, 15, 16, 18, 22],
  [4, 6, 16, 18, 22],
  [5, 5, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
];

function demo(arr: any) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 30; j++) {
      if (arr[i].indexOf(j) > -1) {
        str += "█";
      } else {
        str += " ";
      }
    }
    str += "\n";
  }
  return str;
}
console.log(demo(arr1))





