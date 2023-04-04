const { log } = console

let activeEffect = null
const reactiveMap = new WeakMap()

function effect(fn) {
  const reactEffect = new ReactiveEffect(fn)
  reactEffect.run()
}

class ReactiveEffect {
  constructor(fn, scheduler) {
    this.fn = fn
    this.scheduler = scheduler
  }

  run() {
    try {
      activeEffect = this
      console.log(this)
      let fn = typeof this.fn === 'function' ? this.fn : (this.fn?.get || null)
      return fn && fn()
    } finally {
      activeEffect = null
    }
  }
}


function track(obj, key, oldVal) {
  let depsMap = reactiveMap.get(obj)

  if (!depsMap) {
    reactiveMap.set(obj, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  trackEffects(dep)
}

// dep 是一个set [] 
function trackEffects(dep) {
  log(22, dep)
  if (activeEffect) {
    dep.add(activeEffect)
  }
}


function trigger(obj, key, newV, oldV) {
  const depsMap = (reactiveMap.get(obj) || new Map())
  log(30, reactiveMap, depsMap)
  const dep = (depsMap.get(key) || new Set())

  if (dep.size > 0) {
    for (const effect of dep) {
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }
}

module.exports = {
  ReactiveEffect,
  effect,
  track,
  trackEffects,
  trigger
}


