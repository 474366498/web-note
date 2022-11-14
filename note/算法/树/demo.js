// https://www.cnblogs.com/bzwww/p/13306028.html

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}
const BalancedFactor = {
  UNBALANCED_LEFT: 1,
  SLIGHTLY_UNBALANCED_LEFT: 2,
  BALANCED: 3,
  UNBALANCED_RIGHT: 4,
  SLIGHTLY_UNBALANCED_RIGHT: 5
}
function defaultCompare(a, b) {
  return a === b ? Compare.EQUALS : (a < b) ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.root = null;
    this.compareFn = compareFn;
  }
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    }
    else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }
    return node;
  }
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    }
    else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
    } else {
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      if (node.left == null) {
        node = node.right;
        return node;
      }
      if (node.right == null) {
        node = node.left;
        return node;
      }
      let aux = this.minNode(node.right);
      node.key = aux.key;
      node = this.removeNode(node.right, aux.key);
      return node;
    }
    return node;
  }
  min() {
    return this.minNode(this.root);;
  }
  minNode(node) {
    if (node == null) {
      return node;
    }
    while (node.left != null) {
      node = node.left;
    }
    return node;
  }
  max() {
    return this.maxNode(this.root);
  }
  maxNode() {
    if (node == null) {
      return node;
    }
    while (node.right != null) {
      node = node.right;
    }
    return node;
  }
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node == null) return;
    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }
  inPostTraverse(callback) {
    this.inPostTraverseNode(this.root, callback);
  }
  inPostTraverseNode(node, callback) {
    if (node == null) return;
    this.inPostTraverseNode(node.left, callback);
    this.inPostTraverseNode(node.right, callback);
    callback(node.key);
  }
  inPreTraverse(callback) {
    this.inPreTraverseNode(this.root, callback);
  }
  inPreTraverseNode(node, callback) {
    if (node == null) {
      return;
    }
    callback(node.key);
    this.inPreTraverseNode(node.left, callback);
    this.inPreTraverseNode(node.right, callback);
  }
}
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }
    const balancedFactor = this.getBalanceFactor(node);
    if (balancedFactor === BalancedFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node.left);
      }
    }
    if (balancedFactor === BalancedFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node.right);
      }
    }
    return node;
  }
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node == null) {
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
    } else {
      return node;
    }
    const balancedFactor = this.getBalanceFactor(node);
    if (balancedFactor == BalancedFactor.UNBALANCED_LEFT) {
      const leftBalancedFactor = this.getBalanceFactor(node.left);
      if (leftBalancedFactor == BalancedFactor.BALANCED || leftBalancedFactor == BalancedFactor.SLIGHTLY_UNBALANCED_LEFT) {
        node = this.rotationLL(node);
      }
      if (leftBalancedFactor == BalancedFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationLR(node.left);
      }
    }
    if (balancedFactor == BalancedFactor.UNBALANCED_RIGHT) {
      const rightBalancedFactor = this.getBalanceFactor(node.right);
      if (rightBalancedFactor == BalancedFactor.BALANCED || rightBalancedFactor == BalancedFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationRR(node);
      }
      if (rightBalancedFactor == BalancedFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationRL(node.right);
      }
    }
    return node;
  }
  rotationLL(node) {
    let tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }
  rotationRR(node) {
    let tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }
  rotationLR(node) {
    node.left = this.rotationLL(node.left);
    return this.rotationRR(node);
  }
  rotationRL(node) {
    node.right = this.rotationRR(node.right);
    return this.rotationLL(node);
  }
  getBalanceFactor(node) {
    if (node == null) {
      return;
    }
    let balanceFactor = this.getDifferenceHeight(node.left) - this.getDifferenceHeight(node.right);
    switch (balanceFactor) {
      case 1:
        return BalancedFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalancedFactor.UNBALANCED_LEFT;
      case -1:
        return BalancedFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case -2:
        return BalancedFactor.UNBALANCED_RIGHT;
      default:
        return BalancedFactor.BALANCED;
    }
  }
  getDifferenceHeight(node) {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getDifferenceHeight(node.left), this.getDifferenceHeight(node.right)) + 1;
  }
}
printNode = (value) => console.log(value);
class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }
  isRed() {
    return this.color === Colors.RED;
  }
}
const Colors = {
  RED: 0,
  BLACK: 1
}
class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
  insert(key) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;//返回当前的节点
      } else {
        return this.insertNode(node.left, key);
      }
    }
    else {
      if (node.right == null) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node.right;
      } else {
        return this.insertNode(node.right, key);
      }
    }
  }
  fixTreeProperties(node) {
    //判断新节点，和新节点的父节点存不存在，以及父节点是否为红色，新节点是否为红色
    while (node && node.parent && node.parent.color == Colors.RED && node.color != Colors.BLACK) {
      let parent = node.parent;//获取父节点
      const grandParent = parent.parent;//获取祖节点
      //如果父节点是祖节点的左子节点
      if (grandParent && grandParent.left == parent) {
        //获取叔节点
        const uncle = grandParent.right;
        //如果叔节点存在，并且叔节点的颜色是红色
        if (uncle && uncle.color == Colors.RED) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {//如果叔节点的颜色为黑色
          //新节点位于父节点的右边
          if (node == parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          //新节点位于父节点的左边
          this.rotationLL(grandParent);
          parent.color = Colors.BLACK;//parent现在是祖节点
          grandParent.color = Colors.RED;
          node = parent;
        }
      } else {
        const uncle = grandParent.left;
        if (uncle && uncle.color !== Colors.BLACK) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          if (node == parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          this.rotationRR(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BLACK;
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
}




let rbt = new RedBlackTree()

for (let i = 0; i < 10; i++) {
  rbt.insert(i)
}

console.log(423, rbt)
rbt.inPostTraverse(el => {
  console.log(425, el)
})