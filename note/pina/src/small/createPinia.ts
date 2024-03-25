

import { effectScope, ref } from "vue";
import { piniaSymbol, setActivePinia, Pinia } from "./rootStore";


export function createPinia() {
  const scope = effectScope()

  const state = scope.run(() => ref({}))
  const _p: any[] = []
  const pinia: Pinia = {
    _s: new Map(),
    _e: scope,   // 相应空间
    _p,
    use(callback) {
      _p.push(callback)
      return this
    },
    install(app) {
      setActivePinia(pinia)
      console.log(16, app)
      app.provide(piniaSymbol, pinia)
      app.config.globalProperties.$pinia = pinia
    },
    state
  }
  return pinia
} 
