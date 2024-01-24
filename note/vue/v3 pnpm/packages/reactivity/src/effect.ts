import { TrackOpTypes, TriggerOpTypes } from "./operations";

import { Dep, createDep, finalizeDepMarkers, initDepMarkers, newTracked, wasTracked } from "./dep";
import { EffectScope, recordEffectScope } from "./effectScope";
import { extend, isArray, isIntegerKey, isMap } from "@vue/shared";



const { log, warn } = console





type KeyToDepMap = Map<any, Dep>
/**
 targetMap => WeakMap() 
 {
  target : depsMap[Map] map => { key : Set() }
 }
 */
const targetMap = new WeakMap<any, KeyToDepMap>()


let effectTrackDepth = 0

export let trackOpBit = 1

const maxMarkerBits = 30

export type EffectScheduler = (...args: any[]) => any

export type DebuggerEvent = {
  effect: ReactiveEffect
} & DebuggerEventExtraInfo

export type DebuggerEventExtraInfo = {
  target: object
  type: TrackOpTypes | TriggerOpTypes
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}

export let activeEffect: ReactiveEffect | undefined

export const ITERATE_KEY = Symbol('iterate')

export const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate')

export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  computed?: any
  allowRecurse?: boolean

  private deferStop?: boolean

  onStop?: () => void
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }

  run() {
    if (!this.active) {
      return this.fn()
    }

    let parent: ReactiveEffect | undefined = activeEffect
    let lastShouldTrack = shouldTrack

    while (parent) {
      if (parent === this) {
        return
      }
      parent = parent.parent
    }

    try {
      this.parent = activeEffect
      activeEffect = this
      shouldTrack = true
      trackOpBit = 1 << ++effectTrackDepth
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this)
      } else {
        cleanupEffect(this)
      }
      return this.fn()
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this)
      }
      trackOpBit = 1 << --effectTrackDepth
      activeEffect = this.parent
      shouldTrack = lastShouldTrack
      this.parent = undefined
      if (this.deferStop) {
        this.stop()
      }
    }
  }

  stop() {
    if (activeEffect === this) {
      this.deferStop = true
    } else if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }

}

function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

export let shouldTrack = true
const trackStack: boolean[] = []


export function track(target: object, type: TrackOpTypes, key: unknown) {
  log('effect track', target, type, key)
  // debugger
  if (shouldTrack && activeEffect) {
    // if (shouldTrack) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }
    const eventInfo = { effect: activeEffect, target, type, key }
    log(155, targetMap)
    trackEffects(dep, eventInfo)
  }
}

export function trackEffects(dep: Dep, debuggerEventExtraInfo?: DebuggerEventExtraInfo) {
  let shouldTrack = false

  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit
      shouldTrack = !wasTracked(dep)
    }
  } else {
    shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    dep.add(activeEffect!)
    activeEffect?.deps?.push(dep)
    if (activeEffect?.onTrack) {
      activeEffect?.onTrack({
        effect: activeEffect!,
        ...debuggerEventExtraInfo!
      })
    }
  }

}


export function trigger(target, type: TriggerOpTypes, key?: unknown, newValue?: unknown, oldValue?: unknown, oldTarget?: Map<unknown, unknown> | Set<unknown>) {
  log('effect trigger', target, type, key, newValue, oldValue, oldTarget)
  log('effect', 186, targetMap)
  const depsMap = targetMap.get(target)

  if (!depsMap) {
    return
  }

  let deps: (Dep | undefined)[] = []
  if (type === TriggerOpTypes.CLEAR) {
    deps = [...depsMap.values()]
  } else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= (newValue as number)) {
        deps.push(dep)
      }
    })
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key))
    }

    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get('length'))
        }

        break;
      case TriggerOpTypes.DELETE:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break;
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
        }
        break

    }
  }

  const eventInfo = { target, type, key, newValue, oldValue, oldTarget }

  if (deps.length === 1) {
    if (deps[0]) {
      triggerEffects(deps[0], eventInfo)
    }
  } else {
    const effects: ReactiveEffect[] = []
    for (let dep of deps) {
      dep && effects.push(...dep)
    }
    triggerEffects(createDep(effects), eventInfo)
  }

}

export function triggerEffects(dep: Dep | ReactiveEffect[], debuggerEventExtraInfo?: DebuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep]

  for (let effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo)
    }
  }
  for (let effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo)
    }
  }
}

function triggerEffect(effect: ReactiveEffect, debuggerEventExtraInfo?: DebuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
    }
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

