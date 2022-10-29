let effectMap = new Map()
    let activeEffect = null       // 副作用标识 用于 注册
    const reactive = (data) => {
        return new Proxy(data, {
            set(target, key, value) {
                target[key] = value
                let effectSet = effectMap.get(key)
                effectSet && effectSet.forEach(fn => fn() )
            },
            get(target, key) {
                if(activeEffect){
                    let effectSet = effectMap.get(key) || new Set() 
                    effectSet.add(activeEffect)
                    effectMap.set(key,effectSet)
                }
                return target[key]
            }
        })
    }
    let data = reactive({ name: 'name', age: 20 })
    let state = reactive({ name: 'state', age: 20 })

    const regeisterEffect = (fn) => {
        if(typeof fn !== 'function') return 
        activeEffect = fn 
        fn() 
        activeEffect = null 
    }

    regeisterEffect(function effectName(){
        console.log(25, data.name)
    })
    regeisterEffect(function effectState(){
        console.log(34, state.name)
    })
    console.log(32,effectMap )

    setTimeout(function () {
        data.name = 'change name '
        console.log(36,data.name)
    }, 300)
