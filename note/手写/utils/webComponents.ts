//    Autonomous custom elements 是独立的元素，它不继承其他内建的HTML元素。你可以直接把它们写成HTML标签的形式，来在页面上使用。例如 <popup-info>，或者是document.createElement("popup-info")这样。
//    Customized built -in elements 继承自基本的HTML元素。在创建时，你必须指定所需扩展的元素（正如上面例子所示），使用时，需要先写出基本的元素标签，并通过 is 属性指定custom element的名称。例如 < p is = "word-count" >, 或者 document.createElement("p", { is: "word-count" })。



// Customized built -in elements 继承自基本的HTML元素
const { log } = console
// https://github.com/mdn/web-components-examples/blob/main/expanding-list-web-component/main.js
// Customized built-in elements 继承自基本的 HTML 元素。在创建时，你必须指定所需扩展的元素（正如上面例子所示），使用时，需要先写出基本的元素标签，并通过 is 属性指定 custom element 的名称。

var expandUl: HTMLElement, clickNum: number = 0
// 复杂式
export default class ExpandUl extends HTMLUListElement {
  constructor() {
    expandUl = super()
    // setTimeout(() => {
    const eul = Array.from(expandUl.querySelectorAll('ul'))
    const eli = Array.from(expandUl.querySelectorAll('li'))
    log(21, expandUl, eul)

    eul.forEach(ul => {
      ul.style.display = 'none'
    })

    eli.forEach(li => {
      if (li.querySelectorAll('ul').length > 0) {
        li.setAttribute('class', 'closed')

        const childText: HTMLLIElement = li.childNodes[0]
        const newSpan = document.createElement('span')

        newSpan.textContent = childText.textContent
        newSpan.style.cursor = 'pointer'
        newSpan.style.color = 'red'

        newSpan.onclick = function (e) {
          log('newSpan click', e.target)
          expandUl.setAttribute('click', clickNum++)
          let nextUl = e.target.nextSibling
          if (nextUl.style.display === 'none') {
            nextUl.style.display = 'block'
            e.target.parentNode.setAttribute('class', 'open')
          } else {
            e.target.parentNode.setAttribute('class', 'closed')
            nextUl.style.display = 'none'
          }
        }

        childText.parentNode.insertBefore(newSpan, childText)
        childText.parentNode?.removeChild(childText)
      }
    })
    // }, 500);


  }
  connectedCallback() {
    log('%c 当 custom element 首次被插入文档 DOM 时，被调用。%c', 'color:red;background:pink')
  }
  disconnectedCallback() {
    log('当 custom element 从文档 DOM 中删除时，被调用')
  }
  adoptedCallback() {
    log('当 custom element 被移动到新的文档时，被调用。')
  }
  attributeChangeCallback() {
    log('%c 更新 %c', 'background:green;color:white')
  }
}



// Autonomous custom elements

interface El {
  name: String,
  cname: String,
  props: any,
  innerText: String
}

class CustomElement extends HTMLElement {
  private name
  private cname
  public props
  public innerText
  constructor() {
    super()

    this.name = 'custom-element',
      this.cname = 'vue3 define custom element'
    this.props = {
      title: {
        type: String,
        default: '暂无'
      }
    }
    this.innerText = name
  }

}

console.log(26, CustomElement)
customElements.define('custom-element', CustomElement)






