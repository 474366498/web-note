import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { extend, isArray, isIntegerKey, isMap } from '@vue/shared'
import { ComputedRefImpl } from './computed'
import {
  createDep,
  Dep,
  finalizeDepMarkers,
  initDepMarkers,
  newTracked,
  wasTracked
} from './dep'

import { EffectScope, recordEffectScope } from './effectScope'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

let effectTrackDepth = 0
export let trackOpBit = 1

const maxMarkerBits = 30

export let shouldTrack = true

export type EffectScheduler = (...args: any[]) => any

export type DebuggerEvent = { effect: ReactiveEffect } & DebuggerEventExtraInfo

export type DebuggerEventExtraInfo = {
  target: object,
  type: TrackOpTypes | TriggerOpTypes,
  key: any,
  newValue?: any,
  oldValue?: any,
  oldTarget?: Map<any, any> | Set<any>
}

export let activeEffect: ReactiveEffect | undefined

export const ITERATE_KEY = Symbol('iterate')
export const MAP_KEY_ITERATE_KEY = Symbol('Map key iterate')

export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  computed?: ComputedRefImpl<T>

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
  console.log(125, effect)
  if (deps && deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}


export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffectRunner {
  if ((fn as ReactiveEffectRunner).effect) {
    fn = (fn as ReactiveEffectRunner).effect.fn
  }

  const _effect = new ReactiveEffect(fn)

  if (options) {
    extend(_effect, options)
    if (options.scope) recordEffectScope(_effect, options.scope)
  }

  if (!options || !options.lazy) {
    _effect.run()
  }
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}

export function stop(runner: ReactiveEffectRunner) {
  runner.effect.stop()
}

const trackStack: boolean[] = []

export function pauseTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = false
}

export function enableTracking() {
  trackStack.push(shouldTrack)
  shouldTrack = true
}

export function resetTracking() {
  const last = trackStack.pop()
  shouldTrack = last === undefined ? true : last
}

export function track(target, type, key) {
  console.log(195, targetMap)
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)

    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }

    const eventInfo = { effect: activeEffect, target, type, key } || undefined
    trackEffects(dep, eventInfo)
  }
}


export function trackEffects(dep, eventInfo?) {
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
    activeEffect!.deps.push(dep)

    if (activeEffect!.onTrack) {
      activeEffect!.onTrack({
        effect: activeEffect!,
        ...eventInfo
      })
    }

  }

}

export function trigger(target: object, type: TriggerOpTypes, key?: unknown, newValue?: unknown, oldValue?: unknown, oldTarget?: Map<unknown, unknown> | Set<unknown>) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

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
    console.log(256, type)
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
        break
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
        }
        break
      default:
        break;
    }

  }

  const eventInfo = { target, type, key, newValue, oldValue, oldTarget } || undefined

  if (deps.length === 1) {
    if (deps[0]) {
      eventInfo
        ? triggerEffects(deps[0], eventInfo)
        : triggerEffects(deps[0])
    }
  } else {
    const effects: ReactiveEffect[] = []
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep)
      }
    }
    eventInfo
      ? triggerEffects(createDep(effects), eventInfo)
      : triggerEffects(createDep(effects))
  }
}

export function triggerEffects(dep, info?) {
  const effects = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, info)
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, info)
    }
  }
}

function triggerEffect(effect, info) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, info))
    }
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}



// https://view.officeapps.live.com/op/view.aspx?src=xxx.xlsx