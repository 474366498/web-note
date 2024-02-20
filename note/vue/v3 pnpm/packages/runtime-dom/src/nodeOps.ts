




export const nodeOps = {

  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },

  remove: child => {
    const parent = child.parentNode
    parent && parent.removeChild(child)
  },

  createElement: tag => document.createElement(tag),

  createText: text => document.createTextNode(text),
  // 注释节点
  createComment: text => document.createComment(text),

  setText: (node, text) => {
    node.nodeValue = text
  },

  setElementText: (el, text) => {
    el.textContent = text
  },

  parentNode: node => node.parentNode as Element | null,

  nextSibling: node => node.nextSibling,

  querySelector: selector => document.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, '')
  }

}











