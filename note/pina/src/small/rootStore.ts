

import { StateTree } from '@/pinia/src'
import { PiniaPlugin } from 'pinia'
import { App, EffectScope, Ref } from 'vue'
export const piniaSymbol = Symbol()

export let activePinia: Pinia | undefined

export const setActivePinia = pinia => activePinia = pinia

export interface Pinia {
  install: (app: App) => void,
  state: Ref<Record<string, StateTree>>,
  use(plugin: PiniaPlugin): Pinia,
  _p: PiniaPlugin,
  _a: App,
  _e: EffectScope,
  _s: Map<string, Object>
}

