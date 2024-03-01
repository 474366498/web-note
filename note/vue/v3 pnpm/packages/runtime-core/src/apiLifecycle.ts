
// 生命周期

import { currentInstance, setCurrentInstance, getCurrentInstance, ComponentInternalInstance } from "./component"


const enum lifeCycle {
  BEFORE_MOUNT = 'bm',
  MOUNT = 'm',
  BEFORE_UPDATE = 'bu',
  UPDATE = 'u'
}

export const onBeforeMount = createHook(lifeCycle.BEFORE_MOUNT)
export const onMounted = createHook(lifeCycle.MOUNT)
export const onBeforeUpdate = createHook(lifeCycle.BEFORE_UPDATE)
export const onUpdated = createHook(lifeCycle.UPDATE)


// 创建生命周期 hook 
// 返回值 是一个函数
function createHook(life) {
  // 核心就是生命周期要和当前组件实现产生关联
  // ? 组件父子关系
  return function createHook(hook, target = window.instance) {
    // console.log(27, life, hook, target, currentInstance, window)
    if (!target) return
    // hook()
    injectHook(life, hook, target)
  }
}

function injectHook(type, hook, instance = window.instance) {
  if (instance) {
    const hooks = instance[type] || (instance[type] = [])
    const wrappedHook = () => {
      if (instance.isUnmounted) return
      setCurrentInstance(instance)
      hook()
      setCurrentInstance(null)
    }
    hooks.push(wrappedHook)
  } else {
    console.warn('没有拿到 instance ')
  }
  console.log('lifecycle', 40, instance)
}

/**
 * 实现vue3生命周期
 * 1。 vue3 生命周期都置入到当前组件实例上
 * 2。 vue3 生命周期 要在setup中使用 通过每一个组件 在调用setup之前产生一个全局的组件实例
 * 在setup中使用生命周期（指向当前组件） setup执行完毕 把全局组件实例（currentInstance）变成null 
 * 
 * 生命周期的调用 就是通过 vue3组件渲染 diff对比 的流程
 */

