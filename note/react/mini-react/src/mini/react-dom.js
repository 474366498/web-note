
import { createRoot } from "./fiber"

function render(element, container) {
  // const dom = renderDom(element)
  // container.appendChild(dom)
  createRoot(element, container)
}

export function renderDom(element) {
  // console.log(8, element)
  let dom = null

  // 条件渲染 为 false时 
  if (!element && element !== 0) {
    return null
  }

  if (typeof element === 'string') {   // 字符串
    dom = document.createTextNode(element)
    return dom
  } else if (typeof element === 'number') {   // 数字
    return document.createTextNode(String(element))
  }

  // if (Array.isArray(element)) { // 数组 列表渲染
  //   dom = document.createDocumentFragment()
  //   for (let item of element) {
  //     let child = renderDom(item)
  //     child && dom.appendChild(child)
  //   }
  //   return dom
  // }


  // 解析element 对象

  let { type, props: { children, ...attributes } } = element

  if (typeof type === 'string') {
    // type 是 html 标签 
    dom = document.createElement(type)
  } else if (typeof type === 'function') {
    console.log(44, element)
    dom = document.createDocumentFragment()
    // if (type.prototype.isReactComponent) {
    //   // 类组件 
    //   const { props, type: Comp } = element
    //   const component = new Comp(props)
    //   const jsx = component.render()
    //   dom = renderDom(jsx)
    // } else {
    //   // 函数组件
    //   const { props, type: Fn } = element
    //   const jsx = Fn(props)
    //   dom = renderDom(jsx)
    // }
  } else {
    return null
  }

  // if (children) {
  //   const childrenDom = renderDom(children)
  //   if (childrenDom) {
  //     dom.appendChild(childrenDom)
  //   }
  // }
  updateAttributes(dom, attributes, null)
  return dom
}


export function updateAttributes(el, attributes, oldAttributes) {

  if (oldAttributes) {
    Object.keys(oldAttributes).forEach(key => {
      if (key.startsWith('on')) {
        let eventName = key.slice(2).toLowerCase()
        el.removeEventListener(eventName, oldAttributes[key])
      } else if (key === 'className') {
        let classes = oldAttributes[key].split(' ')
        classes.forEach(_ => {
          el.classList.remove(_)
        })
      } else if (key === 'style') {
        let style = oldAttributes[key]
        Object.keys(style).forEach(s => {
          el.style[s] = 'initial'
        })
      } else {
        el[key] = ''
      }
    })
  }

  Object.keys(attributes).forEach(key => {
    if (key.startsWith('on')) {
      // console.log('event')
      let eventName = key.slice(2).toLocaleLowerCase()
      el.addEventListener(eventName, attributes[key])
    } else if (key === 'className') {
      let classes = attributes[key].split(' ')
      classes.forEach(c => {
        el.classList.add(c)
      })
    } else if (key === 'style') {
      let style = attributes[key]
      Object.keys(style).forEach(s => {
        el.style[s] = style[s]
      })
    } else {
      el[key] = attributes[key]
    }
  })
}



const ReactDOM = {
  render
}



export default ReactDOM