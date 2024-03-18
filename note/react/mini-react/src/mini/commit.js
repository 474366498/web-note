
import { updateAttributes } from './react-dom'
import { getDeleteFibers } from './fiber'

export function commitRoot(rootFiber) {
  let deleteFibers = getDeleteFibers()
  deleteFibers.forEach(commitWork)
  commitWork(rootFiber.child)
}

function commitWork(fiber) {
  if (!fiber) return

  let parentDom = fiber.return.stateNode
  if (fiber.flag === 'Deletion') {
    if (typeof fiber.element?.type !== 'function') {
      parentDom.removeChild(fiber.stateNode)
    }
    return
  }

  // console.log(13, fiber)
  // debugger
  // 深度优先遍历，先遍历 child，后遍历 sibling
  commitWork(fiber.child)
  if (fiber.flag === 'Placement') {
    if (!fiber.stateNode) return
    let anchorDom = parentDom.childNodes[fiber.index]  // 要插入到哪个 dom 之前
    if (anchorDom) {
      parentDom.insertBefore(fiber.stateNode, anchorDom)
    } else {
      parentDom.appendChild(fiber.stateNode)
    }
  } else if (fiber.flag === 'Update') {
    const { children, ...newAttributes } = fiber.element.props
    const oldAttributes = Object.assign({}, fiber.alternate.element.props)
    delete oldAttributes.children
    updateAttributes(fiber.stateNode, newAttributes, oldAttributes)
  }
  commitWork(fiber.sibling)
}