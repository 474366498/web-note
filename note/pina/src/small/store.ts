
import { activePinia, piniaSymbol, setActivePinia, Pinia } from "./rootStore"
import { computed, effectScope, getCurrentInstance, inject, isRef, isReactive, reactive, toRefs, watch } from "vue"
import { isString, isFunction, isObject } from "./utils"
import {
  addSubscription,
  triggerSubscriptions
} from './subscribe'

function isComputed(v) {
  return !!(isRef(v) && v.effect)
}

function mergeReactiveObjects(target, state) {
  for (let key in state) {
    let oldVal = target[key]
    let newVal = state[key]

    if (isObject(oldVal) && isObject(newVal)) {
      target[key] = mergeReactiveObjects(oldVal, newVal)
    } else {
      target[key] = newVal
    }
  }
}


export function defineStore(idOrOptions: any, setup?: any) {
  console.log(4, idOrOptions, setup)
  const isSetupStore = typeof setup === 'function'
  let id: string
  let options: Object | Function

  if (isString(idOrOptions)) {
    id = idOrOptions
    options = setup
  } else {
    id = idOrOptions.id
    options = idOrOptions
  }

  function useStore() {
    const instance = getCurrentInstance()
    let pinia: Pinia = instance && inject(piniaSymbol)
    if (pinia) {
      setActivePinia(pinia)
    }
    pinia = activePinia!

    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, options, pinia)
      } else {
        createOptionsStore(id, options, pinia)
      }
    }
    const store = pinia?._s.get(id)
    return store
  }
  return useStore
}



let actionSubscriptions: Array<any> = []
function createStore(pinia, id) {
  console.log('createStore', pinia, id)
  let scope = effectScope()
  const partialStore = {
    $patch: (partialStateOrMutator: Object | Function) => {
      if (isFunction(partialStateOrMutator)) {
        partialStateOrMutator(pinia.state.value[id])
      } else {
        mergeReactiveObjects(pinia.state.value[id], partialStateOrMutator)
      }
    },
    $subscribe: (callback, options = {}) => {
      scope.run(() => {
        watch(
          pinia.state.value[id],
          state => {
            callback({ storeId: id }, state)
          },
          options
        )
      })
    },
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $dispose: () => {
      scope.stop()
      actionSubscriptions = []
      pinia._s.delete(id)
    }
  }

  const store = reactive(partialStore)
  Object.defineProperty(store, '$state', {
    get: () => {
      console.log('get')
      return pinia.state.value[id]
    },
    set: (state) => {
      console.log('set')
      if (isFunction(state)) {
        state(pinia.state.value[id])
      } else {
        mergeReactiveObjects(pinia.state.value[id], state)
      }
    }
  })
  return store
}


// function setup 
function createSetupStore(id: string, setup: Function, pinia: Pinia, isOptions = false) {
  // console.log(45, id, setup, pinia)
  // store自己的scope,pinia._e是全局的scope
  let scope

  const store = createStore(pinia, id)

  const initalState = pinia.state?.value[id]
  if (!initalState && !isOptions) {
    pinia.state.value[id] = {}
  }

  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup())
  })

  function wrapAction(name, action) {
    // console.log(120, name, action)
    return function () {
      const args = Array.from(arguments)
      let afterCallbackList = []
      let onErrorCallbackList = []
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after: (callback) => afterCallbackList.push(callback),
        onError: (callback) => onErrorCallbackList.push(callback)
      })
      console.log(130, actionSubscriptions)
      let ret
      try {
        ret = action.apply(store, args)
      } catch (e) {
        triggerSubscriptions(onErrorCallbackList, e)
      }
      console.log(134, ret)
      // ret 即 prop方法是一个promise时
      if (ret instanceof Promise) {
        ret.then(res => {
          triggerSubscriptions(afterCallbackList, res)
          return res
        }).catch(error => {
          triggerSubscriptions(onErrorCallbackList, error)
          return Promise.reject(error)
        })
      }
      triggerSubscriptions(afterCallbackList, ret)
      return ret
    }
  }

  for (let key in setupStore) {
    const prop = setupStore[key]
    // console.log(69, key, prop, isFunction(prop))
    if (isFunction(prop)) {
      setupStore[key] = wrapAction(key, prop)
    }

    if ((isRef(prop) && !isComputed(prop)) || isReactive(prop)) {
      if (!isOptions) {
        pinia.state.value[id][key] = prop
      }
    }

  }

  console.log('setup function pinia', pinia, setupStore)
  store.id = id
  pinia._s.set(id, store)
  Object.assign(store, setupStore)
  return store
}

// options setup
function createOptionsStore(id: string, options: Object, pinia: Pinia) {
  const { state, getters, actions } = options

  let scope


  const store = createStore(pinia, id)
  console.log(42, pinia)
  function setup() {
    pinia.state.value[id] = state ? state() : {}
    const localState = toRefs(pinia.state.value[id])
    console.log(47, pinia, localState)
    const gettersArgs = Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = computed(() => {
        return getters[name].call(store, store)
      })
      return computedGetters
    }, {})
    return Object.assign(localState, actions, gettersArgs)
  }

  /*
  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup())
  })

  function wrapAction(name, action) {
    return function () {
      const args = Array.from(arguments)
      return action.apply(store, args)
    }
  }

  for (let key in setupStore) {
    const prop = setupStore[key]
    if (isFunction(prop)) {
      setupStore[key] = wrapAction(key, prop)
    }
  }
  store.id = id

  pinia._s.set(id, store)
  Object.assign(store, setupStore)
  */
  let _store = createSetupStore(id, setup, pinia, true)
  Object.assign(store, _store)

  store.$reset = function () {
    console.log('options reset')
    const newState = state ? state() : {}
    store.$patch(state => {
      Object.assign(state, newState)
    })
  }

  return store
}

