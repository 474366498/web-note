import { hyphenate, isArray, isObject, isString } from "."
import { isNoUnitNumericStyleProp } from './domAttrConfig'







export function normalizeClass(value: unknown): string {
  let res = ''
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + '  '
      }
    }
  } else if (isObject(value)) {
    for (let name in value) {
      if (value[name]) {
        res += name + '  '
      }
    }
  }
  return res
}

export function normalizeProp(props) {

  if (!props) return null
  let { class: klass, style } = props

  if (klass && isString(klass)) {
    props.class = normalizeClass(klass)
  }
  if (style) {
    props.style = normalizeStyle(style)
  }
  return props
}

export function normalizeStyle(styles): string {

  let ret = ''
  if (!styles || isString(styles)) return ret

  for (let key in styles) {
    const value = styles[key]
    let normalizedKey = key.startsWith('--') ? key : hyphenate(key)
    if (isString(value) || (typeof value === 'number' && isNoUnitNumericStyleProp(normalizedKey))) {
      ret += `${normalizedKey} : ${value} ; `
    }
  }

  return ret

}


