
// 增 删 改 元素 和 文本 
export const nodeOpts = {
  createEl: (tagName) => {
    document.createElement(tagName)
  },
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor)
  },
  removeEl: (el) => {
    let parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  },

  createText: (text) => document.createTextNode(text),

  createComment: text => document.createComment(text),

  setText: (node, text) => node.nodeValue = text,

  setElText: (el, text) => el.textContent = text,

  parentNode: node => node.parentNode,

  nextSiblings: node => node.nextSiblings,

  querySelector: selector => document.querySelector(selector),

  setScopedId: (el, id) => el.setAttribute(id, '')

}

