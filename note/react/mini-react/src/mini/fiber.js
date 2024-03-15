

import { renderDom } from './react-dom'
import { commitRoot } from './commit'



let rootFiber = null,
  nextUnitOfWork = null  // 下一个要处理的任务单元



export function createRoot(element, container) {
  rootFiber = {
    stateNode: container,  // 记录对应的真实dom节点
    element: {
      // 挂载 element 
      props: { children: [element] }
    }
  }
  nextUnitOfWork = rootFiber
}





function performUnitOfWork(workInProgress) {

  if (!workInProgress.stateNode) {
    workInProgress.stateNode = renderDom(workInProgress.element)
  }

  // if (workInProgress.return && workInProgress.stateNode) {
  //   let parentFiber = workInProgress.return
  //   while (!parentFiber.stateNode) {
  //     parentFiber = parentFiber.return
  //   }
  //   parentFiber.stateNode.appendChild(workInProgress.stateNode)
  // }

  let children = workInProgress.element?.props?.children,
    type = workInProgress.element?.type

  if (typeof type === 'function') {
    // 当前 fiber 对应 React 组件时，对其 return 迭代
    if (type.prototype.isReactComponent) {
      const { props, type: Comp } = workInProgress.element
      const component = new Comp(props)
      const jsx = component.render()
      children = [jsx]
    } else {
      const { props, type: Fn } = workInProgress.element
      const jsx = Fn(props)
      children = [jsx]
    }
  }

  if (children || children === 0) {
    // children 存在时，对 children 迭代
    let elements = Array.isArray(children) ? children : [children]
    // 打平列表渲染时二维数组的情况（暂不考虑三维及以上数组的情形）
    elements = elements.flat()

    let index = 0  // 当前遍历的子元素在父节点下的下标
    let prevSibling = null  // 记录上一个兄弟节点

    while (index < elements.length) {
      const element = elements[index]
      const newFiber = {
        element,
        return: workInProgress,
        stateNode: null
      }
      if (index === 0) {
        workInProgress.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
      index++
    }

  }

  if (workInProgress.child) {
    // 如果有子 fiber，则下一个工作单元是子 fiber
    nextUnitOfWork = workInProgress.child
  } else {
    let nextFiber = workInProgress
    while (nextFiber) {
      if (nextFiber.sibling) {
        // 没有子 fiber 有兄弟 fiber，则下一个工作单元是兄弟 fiber
        nextUnitOfWork = nextFiber.sibling
        return
      } else {
        nextFiber = nextFiber.return
      }
    }
    if (!nextFiber) {
      nextUnitOfWork = null
    }
  }

}

/*
使用 requestIdleCallback 函数在浏览器每帧空闲时期去调用回调函数 workLoop，requestIdleCallback会给回调函数传入一个 deadline 参数我们可以使用它来检查当前帧还有多少时间浏览器空闲时间。我们用一个 shouldYied 的变量表示是否应该中断当前循环，当 deadline.timeRemaining() < 1 时， shouldYied 为 true，会中断当前迭代，留到下一帧再继续执行。(由于 requestIdleCallback 执行较慢及兼容性问题，React 现在不再使用 requestIdleCallback 了，而是自己实现了类似的功能，不过这里我们为了方便还是直接使用就行，思想上是相同的。)
*/
function workLoop(deadline) {
  // console.log(112, deadline)
  // debugger
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    // 循环执行工作单元任务
    performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextUnitOfWork && rootFiber) {
    commitRoot(rootFiber)
    rootFiber = null
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)