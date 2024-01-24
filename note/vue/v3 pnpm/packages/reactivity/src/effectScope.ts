


import { ReactiveEffect } from "./effect";

const { log, warn } = console

let activeEffectScope: EffectScope | undefined

export class EffectScope {
  active = true

  effects: ReactiveEffect[] = []

  cleanups: (() => void)[] = []

  parent: EffectScope | undefined

  scopes: EffectScope[] | undefined

  private index: number | undefined

  constructor(detached = false) {
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1
    }
  }

  run<T>(fn: () => T): T | undefined {
    if (this.active) {
      const currentEffectScope = activeEffectScope
      try {
        activeEffectScope = this
        return fn()
      } finally {
        activeEffectScope = currentEffectScope
      }
    } else {
      warn('cannot run an inactive effect scope.')
    }
  }

  on() {
    activeEffectScope = this
  }

  off() {
    activeEffectScope = this.parent
  }

  stop(fromParent?: boolean) {
    if (this.active) {
      let i, l

      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop()
      }

      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]()
      }

      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true)
        }
      }

      if (this.parent && !fromParent) {
        const last = this.parent.scopes!.pop()
        if (last && last !== this) {
          this.parent.scopes![this.index!] = last
          last.index = this.index!
        }
      }
      this.active = false
    }
  }
}

export function effectScope(detached?: boolean) {
  return new EffectScope(detached)
}

export function recordEffectScope(effect: ReactiveEffect, scope: EffectScope | undefined = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect)
  }
}

export function getCurrentScope() {
  return activeEffectScope
}

export function onScopeDispose(fn: () => void) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn)
  } else {
    warn(
      `onScopeDispose() is called when there is no active effect scope` +
      ` to be associated with.`
    )
  }
}