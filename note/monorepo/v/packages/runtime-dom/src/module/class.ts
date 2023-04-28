
//  class a. 'one' => ''  b. 'one' => null  c. 'one' => 'one two'  d. 'one' => ' two'
export const patchClass = (el, newV) => {
  if (!newV) newV = ''
  el.className = newV
}

