

## ref.ts  
**package/reactivity/src/index.ts**

``` typescript 

  export {
    ref,
    shallowRef,
    isRef,
    toRef,
    toRefs,
    unref,
    proxyRefs,
    customRef,
    triggerRef,
    Ref,
    ToRef,
    ToRefs,
    UnwrapRef,
    ShallowRef,
    ShallowUnwrapRef,
    RefUnwrapBailTypes,
    CustomRefFactory
  } from './ref'


```

1. ref 与 shallowRef

``` typescript 

export function ref(value?:unknown) {
  return createRef(value,false )
}

export function shallowRef(value?:unknown){
  return createRef(value , true)
}

function createRef(rawValue :unknown , shallow : boolean) {
  if(isRef(rawValue)) {
    return rawValue 
  }
  return new RefImpl(rawValue , shallow)
}

```

2. class RefImpl 


``` typescript 

class RefImpl <T> {
  private _value : T 
  private _rawValue : T 

  public dep ?: Dep = undefined 
  public readonly _v_isRef = true  // 可以用来判断是不是ref类型

  constructor (value :T , public readonly __v_isShallow : boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)   // 未代理的value 
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value () {
    trackRefValue(this)
    return this._value 
  }

  set value (newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal) 
    newVal = useDirectValue ? newVal : toRaw(newVal) 

    if (hasChanged (newVal , this._rawValue)){   // hasChanged => Object.is(val,oldVal)
      this._rawValue = newVal 
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this,newVal)
    }
  }
}


```

3. trackRefValue  triggerRefValue 

``` typescript
// packages/reactivity/src/reactive.ts 
export function toRaw<T>(observed:T) :T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}


export function trackRefValue (ref:RefBase<any>) {
  if(shouldTrack && activeEffect) {  // 判断当前 activeEffect是否存在 存在则收集依赖
    ref = toRaw(ref)
    if(__DEV__) {
      // 收集target为ref key为‘value’的依赖
      trackEffects(ref.dep || (ref.dep = createDep()) ,{
        target : ref ,
        type : TrackOpTypes.GET ,
        key:'value'
      })
    }else {
      trackEffects(ref.dep || (ref.dep = createDep() ) )
    }
  }
}


export function triggerRef (ref:Ref) {
  triggerRefValue(ref,__DEV__ ? ref.value : void 0)
}

export function triggerRefValue (ref:RefBase<any> , newVal ?: any) {
  ref = toRaw(ref)
  if(ref.dep) {
    if(__DEV__) {
      triggerEffects(ref.dep , {
        target : ref ,
        type : TriggerOpTypes.SET ,
        key :'value' ,
        newValue : newVal 
      })
    }else{
      triggerEffects(ref.dep)
    }
  }
} 

```
4. triggerEffects

*** packages/reactivity/src/effect.ts ***

``` typescript 

export function triggerEffects (dep:Dep | ReactiveEffect[] , debuggerEventExtraInfo ?: DebuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep]

  for(const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect,debuggerEventExtraInfo)
    }
  }
  for(const effect of effects) {
    if(!effect.computed) {
      triggerEffect(effect,debuggerEventExtraInfo)
    }
  }
}

function triggerEffect (effect:ReactiveEffect , debuggerEventExtraInfo ?: DebuggerEventExtraInfo) {
  if(effect !== activeEffect || effect.allowRecurse) {
    if(__DEV__ && effect.onTrigger) {
      effect.onTrigger(extend({effect}, debuggerEventExtraInfo))
    }
    if(effect.scheduler) {
      effect.scheduler()
    }else {
      effect.run()
    }
  }
}

``` 


5. class ReactiveEffect 

*** packages/reactivity/src/effect.ts *** 

``` typescript 

class ReactiveEffect<T = any> {
  active = true 
  deps:Dep[] = [] 
  parent : ReactiveEffect | undefined = undefined 
 
  computed ?: ComputedRefImpl<T>  // computed 

  allowRecurse ?: boolean 

  private deferStop ?: boolean 

  onStop ?: ()=> void 

  onTrack ?: (event:DebuggerEvent) => void 

  onTrigger ?: (event:DebuggerEvent) => void 

  constructor (
    public fn:()=>T , 
    public scheduler : EffectScheduler |null = null , 
    scope ?: EffectScope
    ){
      recordEffectScope(this,scope)
  }

  run () {
    if(!this.active) {
      return this.fn()
    }

    let parent : ReactiveEffect | undefined = activeEffect 
    let lastShouldTrack = shouldTrack 

    while(parent) {
      if(parent === this) {
        return 
      }
      parent = parent.parent 
    }

    try {
      this.parent = activeEffect 
      activeEffect = this 
      shouldTrack = true 

      trackOpBit = 1 << ++ effectTrackDepth 

      if(effectTrackDepth <= maxMarkerBits ) {
        initDepMarkers(this)
      }else{
        cleanupEffect(this)
      }
      return this.fn()
    } finally {
      if(effectTrackDepth <= maxMarkerBits ) {
        finalizeDepMarkers(this)
      }

      trackOpBit = 1 << -- effectTrackDepth 

      activeEffect = this.parent 
      shouldTrack = lastShouldTrack 
      this.parent = undefined 

      if(this.deferStop) {
        this.stop()
      }
    }
  }

  stop () {
    if(activeEffect === this ) {
      this.deferStop = true 
    }else if(this.active) {
      cleanupEffect(this)
      if(this.onStop){
        this.onStop()
      }
      this.active = false 
    }
  }

}

// packages/reactivity/src/effectScope.ts
export function recordEffectScope (effect : ReactiveEffect , scope:EffectScope | undefined = activeEffectScope){
  if(scope && scope.active) {
    scope.effects.push(effect)
  }
}

// packages/reactivity/src/dep.ts
export function initDepMarkers = ({deps}:ReactiveEffect) => {
  if(deps.length) {
    for(let i = 0 ; i < deps.length ; i++) {
      deps[i].w |= trackOpBit   // trackOpBit = 1 
    }
  }
}

function cleanupEffect (effect : ReactiveEffect) {
  const {deps } = effect 
  if(deps.length) {
    for(let i = 0 ; i < deps.length ; i++ ) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

```


6. 

## reactive.ts

















