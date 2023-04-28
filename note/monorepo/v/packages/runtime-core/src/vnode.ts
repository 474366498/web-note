
// createVNode 与h 其实就是一个作用
export function createVNode(com, props, children = null) {
  console.log(com)
  const vnode = {
    isVnode: true,
    type: com,
    props,
    key: props?.key,
    children,
    el: null,
    shapeFlag: 1, // 节点类型
  }
  return vnode
}


