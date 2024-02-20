import { isModelListener, isOn, isString } from "@vue/shared"



const nativeOnRE = /^on[a-z]/

export const patchProp = (el, key, pValue, nValue) => {


  // if (key === 'class') {
  //   patchClass(el, nValue)
  // } else if (key === 'style') {
  //   patchStyle(el, pValue, nValue)
  // } else if (isOn(key)) {
  //   if (!isModelListener(key)) {
  //     patchEvent(el, key, pValue, nValue)
  //   }
  // } else if (
  //   key[0] === '.'
  //     ? ((key = key.slice(1)), true)
  //     : key[0] === '^'
  //       ? ((key = key.slice(1)), false)
  //       : shouldSetAsProp(el, key, nValue)
  // ) {
  //   patchDOMProp(el, key, nValue)
  // } else {
  //   patchAttr(el, key, nValue)
  // }

}


function shouldSetAsProp(el, key, value) {
  // these are enumerated attrs, however their corresponding DOM properties
  // are actually booleans - this leads to setting it with a string "false"
  // value leading it to be coerced to `true`, so we need to always treat
  // them as attributes.
  // Note that `contentEditable` doesn't have this problem: its DOM
  // property is also enumerated string values.
  if (key === 'spellcheck' || key === 'draggable' || key === 'translate') {
    return false
  }

  // #1787, #2840 form property on form elements is readonly and must be set as
  // attribute.
  if (key === 'form') {
    return false
  }

  // #1526 <input list> must be set as attribute
  if (key === 'list' && el.tagName === 'INPUT') {
    return false
  }

  // #2766 <textarea type> must be set as attribute
  if (key === 'type' && el.tagName === 'TEXTAREA') {
    return false
  }

  // native onclick with string value, must be set as attribute
  if (nativeOnRE.test(key) && isString(value)) {
    return false
  }
}















