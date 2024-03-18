/**
 我们在 diff 算法中讲过，diff 过程中，react 中有两棵 fiber 树：current fiber 树（上一次渲染时生成的 fiber 树）和 workInProgress fiber 树（本次渲染的 fiber 树），diff 过程实际上就是这两棵 fiber 树之间的 diff。
我们代码中每次 render 阶段执行的 fiber 树，实际上就是 workInProgress fiber 树，rootFiber 就是 workInProgress fiber 树的根结点，所以我们需要再维护一棵 current fiber 树。同时为了便于理解，我们将 rootFiber 更名为 workInProgressRoot:
 */

import { renderDom } from './react-dom'
import { commitRoot } from './commit'
import { reconcileChildren } from './reconciler'


// let rootFiber = null, nextUnitOfWork = null  // 下一个要处理的任务单元

let workInProgressRoot = null // 当前工作的fiber树 
let nextUnitOfWork = null  // 下一个要处理的任务单元
let currentRoot = null    // 上一次渲染的fiber树
let deleteFibers = []     // 要进行删除的fiber数组

let currentFunctionFiber = null // 当前正在执行的函数组件对应fiber 
let hookIndex = 0  // 当前正在执行的函数组件hook 的下标


export function deleteFiber(fiber) {
  deleteFibers.push(fiber)
}

export function getDeleteFibers() {
  return deleteFibers
}

export function getCurrentFunctionFiber() {
  return currentFunctionFiber
}

export function getHookIndex() {
  return hookIndex++
}


export function commitRender() {
  workInProgressRoot = {
    stateNode: currentRoot.stateNode,
    element: currentRoot.element,
    alternate: currentRoot
  }
  nextUnitOfWork = workInProgressRoot
}

export function createRoot(element, container) {
  workInProgressRoot = {
    stateNode: container,  // 记录对应的真实dom节点
    element: {
      // 挂载 element 
      props: { children: [element] }
    },
    alternate: currentRoot
  }
  nextUnitOfWork = workInProgressRoot
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
    if (type.prototype.isReactComponent) { // 类组件
      /* 用 updateClassComponent 代替
      const { props, type: Comp } = workInProgress.element
      console.log('class component', props, Comp)
      const component = new Comp(props)
      const jsx = component.render()
      children = [jsx]
      */
      children = [updateClassComponent(workInProgress)]
    } else {
      /* 用 updateFunctionComponent 代替
      const { props, type: Fn } = workInProgress.element
      console.log('function component', props, Fn)
      const jsx = Fn(props)
      children = [jsx]
      */
      children = [updateFunctionComponent(workInProgress)]
    }
  }

  if (children || children === 0) {
    // children 存在时，对 children 迭代
    let elements = Array.isArray(children) ? children : [children]
    // 打平列表渲染时二维数组的情况（暂不考虑三维及以上数组的情形）
    elements = elements.flat()
    reconcileChildren(workInProgress, elements)
    /*
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
    */
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


function updateClassComponent(fiber) {
  var jsx
  if (fiber.alternate) {  // 复用
    const component = fiber.alternate.component
    fiber.component = component
    component.updateProps(fiber.element.props)
    jsx = component.render()
  } else {
    const { props, type: Comp } = fiber.element
    const component = new Comp(props)
    fiber.component = component
    jsx = component.render()
  }

  return jsx
}
/*
我们可以在 /src/mini-react/fiber.js 中设置一个全局变量 currentFunctionFiber，指向render 过程中当前处理的函数组件对应的 fiber，并用它来挂载这个函数组件当前的 hooks。同时因为一个函数组件中可能有多个 hooks，所以我们还需要有一个全局的 hookIndex 变量来记录当前执行的 hooks 是当前函数组件中的第几个，同时导出 getCurrentFunctionFiber 和 getHookIndex 的函数来获取 currentFunctionFiber 和 hookIndex，方便后面 /src/mini-react/react 文件

*/
function updateFunctionComponent(fiber) {
  currentFunctionFiber = fiber
  currentFunctionFiber.hooks = []
  hookIndex = 0
  const { props, type: fn } = fiber.element
  return fn(props)
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
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot(workInProgressRoot)
    currentRoot = workInProgressRoot
    workInProgressRoot = null
    deleteFibers = []
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)