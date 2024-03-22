

import { effectScope, ref } from "vue";
import { piniaSymbol, setActivePinia, Pinia } from "./rootStore";


export function createPinia() {
  const scope = effectScope()

  const state = scope.run(() => ref({}))

  const pinia: Pinia = {
    _s: new Map(),
    _e: scope,   // 相应空间
    install(app) {
      setActivePinia(pinia)
      console.log(16, app)
      app.provide(piniaSymbol, pinia)
    },
    state
  }
  return pinia
} 
