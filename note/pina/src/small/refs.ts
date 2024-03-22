import { isReactive, isRef, toRaw, toRef } from "vue";



export function storeToRefs(store) {
  store = toRaw(store)
  const refs = {}
  for (let key in store) {
    let v = store[key]
    if (isRef(v) || isReactive(v)) {
      refs[key] = toRef(store, key)
    }
  }
  return refs
}