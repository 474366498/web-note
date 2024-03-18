
import { deleteFiber } from './fiber'


export function reconcileChildren(workInProgress, elements) {
  let index = 0  // 当前遍历的子元素在父节点的下标
  let prevSibling = null // 记录上一个兄弟节点
  let oldFiber = workInProgress?.alternate?.child
  while (index < elements.length || oldFiber) {
    const element = elements[index]
    let newFiber = null
    let isSameType = element?.type && oldFiber?.element?.type && (element?.type === oldFiber?.element?.type) // 判断新旧节点是不是同一type

    if (isSameType) {
      newFiber = {
        element: {
          ...element,
          props: element.props
        },
        stateNode: oldFiber.stateNode,
        return: workInProgress,
        alternate: oldFiber,
        flag: 'Update'
      }
    } else {
      // type不同 表示添加或删除
      if (element || element === 0) {

        newFiber = {
          element,
          stateNode: null,
          return: workInProgress,
          alternate: null,
          flag: 'Placement',
          index
        }
      }
      if (oldFiber) {
        // oldFiber 存在 删除oldFiber 
        oldFiber.flag = 'Deletion'
        deleteFiber(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      workInProgress.child = newFiber
      prevSibling = newFiber
    } else if (newFiber) {
      prevSibling.sibling = newFiber
      prevSibling = newFiber
    }
    index++
  }
}


