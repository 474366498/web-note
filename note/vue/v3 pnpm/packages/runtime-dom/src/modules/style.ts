import { camelize, capitalize, hyphenate, isArray, isString } from "@vue/shared"





export function patchStyle(el, prev, next) {
  const style = el.style

  const isCssString = isString(next)
  if (next && !isCssString) {
    for (let k in next) {
      setStyle(style, k, next[k])
    }
    if (prev && !isString(prev)) {
      for (let k in prev) {
        if (next[k] == null) {
          setStyle(style, k, '')
        }
      }
    }
  } else {
    const currentDisplay = style.display
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next
      }
    } else if (prev) {
      el.removeAttribute('style')
    }
    if ('_vod' in el) {
      style.display = currentDisplay
    }
  }

}

const importantReg = /\s*!important$/

function setStyle(style, key, value) {
  if (isArray(value)) {
    value.forEach(v => setStyle(style, key, v))
  } else {
    if (value == null) value = ''
    if (key.startsWith('--')) {
      style.setProperty(key, value)
    } else {
      const prefixed = autoPrefix(style, key)
      if (importantReg.test(value)) {
        style.setProperty(hyphenate(prefixed), value.replace(importantReg, ''), 'important')
      } else {
        style[prefixed] = value
      }
    }
  }
}

const prefixes = ['Webkit', 'Moz', 'ms'],
  prefixCache = {}

function autoPrefix(style, rawName): string {

  const cached = prefixCache[rawName]
  if (cached) return cached
  let name = camelize(rawName)
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name)
  }
  name = capitalize(name)

  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed)
    }
  }

  return rawName
}
