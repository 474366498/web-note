
//  style="{color:'red'}" style ="{fontSize:'14px',color:'green'}"
export const patchStyle = (el, oldV, newV) => {
  // const style = el.style
  if (!newV) {
    el.removeAttribute('style')
  } else {
    for (let key in oldV) {
      el.style[key] = ''
    }
    for (let key in newV) {
      el.style[key] = newV[key]
    }
  }
}

