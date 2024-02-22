import { hasOwn } from "@vue/shared"















export const PublicInstanceProxyHandlers = {
  get({ _: target }, key) {
    let { props, data, setupState } = target
    if (key[0] == '$') return
    if (hasOwn(props, key)) {
      return props[key]
    } else if (hasOwn(data, key)) {
      return data[key]
    } else if (hasOwn(setupState, key)) {
      return setupState[key]
    }
  },
  set({ _: target }, key, value) {
    let { props, data, setupState } = target
    if (hasOwn(props, key)) {
      props[key] = value
    } else if (hasOwn(data, key)) {
      data[key] = value
    } else if (hasOwn(setupState, key)) {
      setupState[key] = value
    }
  }

}