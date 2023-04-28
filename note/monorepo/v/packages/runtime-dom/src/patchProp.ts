

import { patchClass } from "./module/class"
import { patchStyle } from "./module/style"
import { patchAttr } from "./module/attr"
import { patchEvent } from "./module/event"

export const patchProp = (el, key, preVal, nextVal) => {
  switch (key) {
    case 'class':
      patchClass(el, nextVal)
      break
    case 'style':
      patchStyle(el, preVal, nextVal)
      break
    case /^on[a-z]/.test(key):
      patchEvent(el, key, nextVal)
      break
    default:
      patchAttr(el, key, nextVal)
      break
  }
}





