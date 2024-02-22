import { includeBooleanAttr } from "@vue/shared"






export function patchDOMProp(el, k, v) {
  if (['innerHTML', 'textContent'].includes(k)) {
    el[k] = v == null ? '' : v
    return
  }

  if (k === 'value' && el.tagName !== 'PROGRESS' && !el.tagName.includes('-')) {
    el._value = v
    const newV = v == null ? '' : v
    if (el.value !== newV || el.tagName === 'OPTION') {
      el.value = newV
    }
    if (v == null) {
      el.removeAttribute(k)
    }
    return
  }

  let needRemove = false
  if (v === '' || v == null) {
    const type = typeof el[k]
    if (type === 'boolean') {
      v = includeBooleanAttr(v)
    } else if (v == null && type === 'string') {
      v = ''
      needRemove = true
    } else if (type === 'number') {
      v = 0
      needRemove = true
    }
  } else {
    needRemove = true
  }
  needRemove && el.removeAttribute(k)
}