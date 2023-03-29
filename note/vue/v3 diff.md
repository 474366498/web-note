## render 与 patch

1. render

**runtime-core/src/renderer.ts**

```typescript
const render: RootRenderFunction = (vnode, container, isSVG) => {
  if (vnode == null) {
    if (container._vnode) {
      // 没有传入新的虚拟节点，当存在旧的虚拟节点，则卸载旧的虚拟节点
      unmount(container._vnode, null, null, true)
    }
  } else {
    // 存在新的虚拟节点 执行patch算法 比较新旧虚拟节点
    path(container._vnode || null, vnode, container, null, null, null, isSVG)
  }
  flushPreFlushCbs()
  // 卸载或者patch都会身任务高度器push任务 flushPostFlushCbs冲刷任务调度器
  flushPostFlushCbs()
  // 容器指向新的虚拟节点
  container._vnode = vnode
}
```

> 不展开讲 unmount，其主要工作为清除 ref，卸载组件、子节点、调用节点和指令的生命周期回调以及将副作用函数推入任务队列（节点内为调用 beforeUnmount 回调，任务为在卸载完所有子节点后，执行 flushPostFlushCbs 冲刷任务队列，执行 unmounted 回调）。

2. patch [!文章详解](https://www.jianshu.com/p/abd46fb77ec8)

**runtime-core/src/renderer.ts**

1. 创建需要新增的节点
2. 移除已经废弃的节点
3. 移动或修改需要更新的节点

```typescript
const patch: PatchFn = (
  n1, // 旧节点
  n2, // 新节点
  container, // 容器
  anchor = null, // 锚点，算法过程中的参考节点
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  slotScopeIds = null,
  optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren // 优化模式标识
) => {
  if (n1 === n2) {
    //新旧节点是同一个对象，直接返回
    return
  }

  // 不是相同类型的节点，直接卸载旧节点
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }
  //被打过BAIL类型标记的节点退出优化模式。
  //比如非编译器生成，而是手动编写的渲染函数，认为总是新的，无法进行优化
  if (n2.patchFlag === PatchFlags.BAIL) {
    optimized = false
    n2.dynamicChildren = null
  }

  const { type, ref, shapeFlag } = n2
  switch (
    type //根据vNode类型，执行不同的算法
  ) {
    case Text: //文本类型
      processText(n1, n2, container, anchor)
      break
    case Comment: //注释类型
      processCommentNode(n1, n2, container, anchor)
      break
    case Static: //静态节点类型
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, isSVG)
      } else if (__DEV__) {
        patchStaticNode(n1, n2, container, isSVG)
      }
      break
    case Fragment: //Fragment类型
      processFragment(/* 忽略参数 */)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        // 元素类型
        processElement(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        // 组件类型
        processComponent(/* 忽略参数 */)
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        // TELEPORT 类型
        ;(type as typeof TeleportImpl).process(/* 忽略参数 */)
      } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
        //SUSPENSE类型
        ;(type as typeof SuspenseImpl).process(/* 忽略参数 */)
      } else if (__DEV__) {
        //警告
        warn('Invalid VNode type:', type, `(${typeof type})`)
      }
  }

  // 设置ref
  if (ref != null && parentComponent) {
    setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
  }
}
```

3. processText

**runtime-core/src/renderer.ts**

```typescript
const processText: ProcessTextOrCommentFn = (n1, n2, container, anchor) => {
  if (n1 == null) {
    // 旧节点不存在 直接创建文本节点并插入
    hostInsert(
      (n2.el = hostCreateText(n2.children as string)),
      container,
      anchor
    )
  } else {
    const el = (n2.el = n1.el!)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.children as string)
    }
  }
}
```

4. processCommentNode

**runtime-core/src/renderer.ts**

```typescript
const processCommentNode: ProcessTextOrCommentFn = (
  n1,
  n2,
  container,
  anchor
) => {
  if (n1 == null) {
    // 旧节点不存在 直接创建文本节点并插入
    hostInsert(
      (n2.el = hostCreateComment((n2.children as string) || '')),
      container,
      anchor
    )
  } else {
    n2.el = n1.el
  }
}
```

5. mountStaticNode 挂载静态节点

**runtime-core/src/renderer.ts**

```typescript
const mountStaticNode = (
  n2,
  container: RenderElement,
  anchor: RenderNode | null,
  isSVG: boolean
) => {
  // 静态节点直接插入
  ;[n2.el, n2.anchor] = hostInsertStaticContent!(
    n2.children as string,
    container,
    anchor,
    isSVG,
    n2.el,
    n2.anchor
  )
}
```

6. patchStaticNode 更新静态节点

**runtime-core/src/renderer.ts**

```typescript
const patchStaticNode = (
  n1: VNode,
  n2: VNode,
  container: RendererElement,
  isSVG: boolean
) => {
  if (n2.children !== n1.children) {
    // 获取参照节点
    const anchor = hostNextSibling(n1.anchor!)
    // 移除旧节点
    removeStaticNode(n1)
    // 插入新节点
    ;[n2.el, n2.anchor] = hostInsertStaticContent!(
      n2.children as string,
      container,
      anchor,
      isSVG
    )
  } else {
    // 直接更新静态内容
    n2.el = n1.el
    n2.anchor = n1.anchor
  }
}
```

7. processFragment ##### Fragment 碎片化节点(包裹器)

**runtime-core/src/renderer.ts**

```typescript
const processFragment = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''))!
  const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''))!

  let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2

  if (
    __DEV__ &&
    // #5523 dev root fragment may inherit directives
    (isHmrUpdating || patchFlag & PatchFlags.DEV_ROOT_FRAGMENT)
  ) {
    // HMR updated / Dev root fragment (w/ comments), force full diff
    patchFlag = 0
    optimized = false
    dynamicChildren = null
  }

  // check if this is a slot fragment with :slotted scope ids
  if (fragmentSlotScopeIds) {
    slotScopeIds = slotScopeIds
      ? slotScopeIds.concat(fragmentSlotScopeIds)
      : fragmentSlotScopeIds
  }

  if (n1 == null) {
    hostInsert(fragmentStartAnchor, container, anchor)
    hostInsert(fragmentEndAnchor, container, anchor)
    // a fragment can only have array children
    // since they are either generated by the compiler, or implicitly created
    // from arrays.
    mountChildren(
      n2.children as VNodeArrayChildren,
      container,
      fragmentEndAnchor,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    if (
      patchFlag > 0 &&
      patchFlag & PatchFlags.STABLE_FRAGMENT &&
      dynamicChildren &&
      // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren
    ) {
      // a stable fragment (template root or <template v-for>) doesn't need to
      // patch children order, but it may contain dynamicChildren.
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        container,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds
      )
      if (__DEV__ && parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2)
      } else if (
        // #2080 if the stable fragment has a key, it's a <template v-for> that may
        //  get moved around. Make sure all root level vnodes inherit el.
        // #2134 or if it's a component root, it may also get moved around
        // as the component is being moved.
        n2.key != null ||
        (parentComponent && n2 === parentComponent.subTree)
      ) {
        traverseStaticChildren(n1, n2, true /* shallow */)
      }
    } else {
      // keyed / unkeyed, or manual fragments.
      // for keyed & unkeyed, since they are compiler generated from v-for,
      // each child is guaranteed to be a block so the fragment will never
      // have dynamicChildren.
      patchChildren(
        n1,
        n2,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
  }
}
```

8. TeleportImpl 针对 teleport suspense

**runtime-core/src/renderer.ts runtime-core/src/components/Teleport.ts**

```typescript
const TeleportImpl = {
  __isTeleport: true,
  process() {},
  remove() {},
  move: moveTeleport,
  hydrate: hydrateTeleport
}
```

9. processComponent

**runtime-core/scr/renderer.ts**

```typescript
const processComponent = (
  n1: VNode | null,
  n2: VNode,
  container: RenderElement,
  anchor: RenderNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  n2.slotScopedIds = slotScopeIds
  if (n1 == null) {
    if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
      ;(parentComponent!.ctx as KeepAliveContext).active(
        n2,
        container,
        anchor,
        isSVG,
        optimized
      )
    } else {
      mountComponent(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
      )
    }
  } else {
    updateComponent(n1, n2, optimized)
  }
}
```

10. processElement

**runtime-core/src/renderer.ts**

```typescript
const processElement = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  isSVG = isSVG || (n2.type as string) === 'svg'
  if (n1 == null) {
    mountElement(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    patchElement(
      n1,
      n2,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  }
}
```

11. mountElement

**runtime-core/src/renderer.ts**

```typescript
const mountElement = (
  vnode: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  let el: RendererElement, vnodeHook: VNodeHook | undefined | null
  const { type, props, shapeFlag, transition, dirs } = vnode
  el = vnode.el = hostCreateElement(
    vnode.type as string,
    isSVG,
    props && props.is,
    props
  )

  //先挂载子元素，因为有些道具可能依赖于子元素
  //已经呈现的，例如<select>
  if (shapeFlag & shapeFlags.TEXT_CHILDREN) {
    hostSetElementText(el, vnode.children as string)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(
      vnode.children as VNodeArrayChildren,
      el,
      null,
      parentComponent,
      parentSuspense,
      isSVG && type !== 'foreignObject',
      slotScopeIds,
      optimized
    )
  }

  if (dirs) {
    // 如有指令 挂载指令
    invokeDirectiveHook(vnode, null, parentComponent, 'created')
  }

  if (props) {
    for (const key in props) {
      if (key !== 'value' && !isReservedProp(key)) {
        hostPatchProp(
          el,
          key,
          null,
          props[key],
          isSVG,
          vnode.children as VNode[],
          parentComponent,
          parentSuspense,
          unmountChildren
        )
      }
    }
    if ('value' in props) {
      hostPatchProp(el, 'value', null, props.value)
    }
    if ((vnodeHook = props.onVnodeBeforeMount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode)
    }
  }

  setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent)

  if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    Object.defineProperty(el, '__vnode', {
      value: vnode,
      enumerable: false
    })
    Object.defineProperty(el, '__vueParentComponent', {
      value: parentComponent,
      enumerable: false
    })
  }

  if (dirs) {
    invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount')
  }

  // suspense + suspense 嵌套
  const needCallTransitionHooks =
    (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
    transition &&
    !transition.persisted

  if (needCallTransitionHooks) {
    transition!.beforeEnter(el)
  }

  hostInsert(el, container, anchor)

  if (
    (vnodeHook = props && props.onVnodeMounted) ||
    needCallTransitionHooks ||
    dirs
  ) {
    // 添加副作用
    queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode)
      needCallTransitionHooks && transition!.enter(el)
      dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted')
    }, parentSuspense)
  }
}
```

12. patchElement

**runtime-core/src/renderer.ts**

```typescript
const patchElement = (
  n1: VNode,
  n2: VNode,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopedIds: string[] | null,
  optimized: boolean
) => {
  const el = (n2.el = n1.el!)
  let { patchFlag, dynamicChildren, dirs } = n2

  ;(patchFlag != n1.patchFlag) & PatchFlags.FULL_PROPS
  const oldProps = n1.props || EMPTY_OBJ,
    newProps = n2.props || EMPTY_OBJ
  let vnodeHook: VNodeHook | undefined | null

  parentComponent && toggleRecurse(parentComponent, false)

  if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
    invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
  }

  if (dirs) {
    invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate')
  }

  parentComponent && toggleRecurse(parentComponent, true)

  if (__DEV__ && isHmrUpdating) {
    patchFlag = 0
    optimized = false
    dynamicChildren = null
  }

  const areChildrenSVG = isSVG && n2.type !== 'foreignObject'

  if (dynamicChildren) {
    patchBlockChildren(
      n1.dynamicChildren!,
      dynamicChildren,
      el,
      parentComponent,
      parentSuspense,
      areChildrenSVG,
      slotScopeIds
    )
    if (__DEV__ && parentComponent && parentComponent.type.__hmrId) {
      traverseStaticChildren(n1, n2)
    }
  } else if (!optimized) {
    patchChildren(
      n1,
      n2,
      el,
      null,
      parentComponent,
      parentSuspense,
      areChildrenSVG,
      slotScopedIds,
      false
    )
  }

  if (patchFlag > 0) {
    if (patchFlag & PatchFlags.FULL_PROPS) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      )
    } else {
      if (patchFlag & PatchFlags.CLASS) {
        if (oldProps.class !== newProps.class) {
          hostPatchProp(el, 'class', null, newProps.class, isSVG)
        }
      }
      if (patchFlag & PatchFlags.STYLE) {
        hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG)
      }

      if (patchFlag & PatchFlags.PROPS) {
        const propsToUpdate = n2.dynamicProps!
        for (let i = 0; i < propsToUpdate.length; i++) {
          const key = propsToUpdate[i],
            prev = oldProps[key],
            next = newProps[key]
          if (next !== prev || key === 'value') {
            hostPatchProp(
              el,
              key,
              prev,
              next,
              isSVG,
              n1.children as VNode[],
              parentComponent,
              parentSuspense,
              unmountChildren
            )
          }
        }
      }

      if (patchFlag & PatchFlags.TEXT) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children as string)
        }
      }
    }
  } else if (!optimized && dynamicChildren == null) {
    patchProps(
      el,
      n2,
      oldProps,
      newProps,
      parentComponent,
      parentSuspense,
      isSVG
    )
  }

  if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
    queuePostRenderEffect(() => {
      vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
      dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated')
    }, parentSuspense)
  }
}
```

13. patchBlockChildren

**runtime-core/src/renderer.ts**

```typescript
const patchBlockChildren: PatchBlockChildrenFn = (
  oldChildren,
  newChildren,
  fallbackContainer,
  parentComponent,
  parentSuspense,
  isSVG,
  slotScopeIds
) => {
  for (let i = 0; i < newChildren.length; i++) {
    const oldVNode = oldChildren[i],
      newVNode = newChildren[i]
    const container =
      oldVNode.el &&
      (oldVNode.type === Fragment ||
        isSameVNodeType(oldVNode, newVNode) ||
        oldVNode.shapeFlag & (ShapeFlags.COMPONENT | ShapeFlags.TELEPORT))
        ? hostParentNode(oldVNode.el)!
        : fallbackContainer

    patch(
      oldVNode,
      newVNode,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      true
    )
  }
}
```

14. patchChildren

**runtime-core/src/renderer.ts**

```typescript

const patchChildren:PatchChildrenFn = (n1,n2,container,anchor,parentComponent,parentSuspense,isSVG,slotScopeIds , optimized=false ) => {
  const c1 = n1 && n1.children , prevShapeFlag = n1 && n1.shapeFlag : 0 , c2 = n2.children

  const { patchFlag , shapeFlag } = n2

  if(patchFlag > 0) {
    // 掘金文章 https://juejin.cn/post/7190796322247540793#heading-8
    if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
      // 如果 patchFlag 是存在 key 值的 Fragment：KEYED_FRAGMENT，则调用 patchKeyedChildren 来继续处理子节点。
      patchKeyedChildren(
        c1 as VNode [] ,
        c2 as VNodeArrayChildren ,
        container ,
        anchor ,
        parentComponent ,
        parentSuspense ,
        isSVG ,
        slotScopeIds ,
        optimized
      )
      return
    } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
      // patchFlag 是没有设置 key 值的 Fragment: UNKEYED_FRAGMENT，则调用 patchUnkeyedChildren 处理没有 key 值的子节点
      //不进行diff比较 根据长度直接挂载或者卸载,
      //可见key的重要性,没有key很可能会混乱
      patchUnkeyedChildren(
        c1 as VNode[] ,
        c2 as VNodeArrayChildren ,
        container ,
        anchor ,
        parentComponent ,
        parentSuspense ,
        isSVG ,
        slotScopeIds ,
        optimized
      )
      return
    }

  }
  // 节点 => 文本 数组 或者 没有子元素
  if(shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // 数组
    if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 卸载旧节点
      unmountChildren(c1 as VNode[], parentComponent , parentSuspense)
    }
    if(c2 !== c1) {
      // 设置 节点文本内容
      hostSetElementText(container, c2 as string)
    }
  }else {
    if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 旧节点是数组
      if(shapeFlag & ShapeFlags.ARRAY_CHILDREN) {   // 新节点是数组
        // 调用 patchKeyedChildren 进行完整的 diff
        patchKeyedChildren(
          c1 as VNode[] ,
          c2 as VNodeArrayChildren ,
          container ,
          anchor ,
          parentComponent ,
          parentSuspense ,
          isSVG ,
          slotScopeIds ,
          optimized
        )
      }else {
        // 新子节点不是数组类型，则说明不存在新子节点，直接从树中卸载旧节点即可
        unmountChildren(c1 as VNode[] , parentComponent , parentSuspense , true )
      }
    }else {
      if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){
        // 旧子节点是文本类型，由于已经在一开始就判断过新子节点是否为文本类型，那么此时可以肯定新子节点肯定不为文本类型，则可以直接将元素的文本置为空字符串
        hostSetElementText(container,'')
      }
      if(shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新子节点是类型为数组类型，而旧子节点不为数组，说明此时需要在树中挂载新子节点，进行 mount 操作即可。
        mountChildren(
          c2 as VNodeArrayChildren ,
          container ,
          anchor ,
          parentComponent ,
          parentSuspense ,
          isSVG ,
          slotScopeIds ,
          optimized
        )
      }
    }
  }

}


```

15. **patchKeyedChildren**

**runtime-core/src/renderer.ts**

```typescript
const patchKeyedChildren = (
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  let i = 0,
    l2 = c2.length,
    e1 = c1.length - 1,
    e2 = l2 - 1
}
```

> 遍历子节点的索引 i = 0 新子节点长度：l2 旧子节点的末尾索引：e1 新子节点的末尾索引：e2

#### 新前与旧前

![新前与旧前](https://github.com/474366498/vue3/blob/main/read~md/patch/1634490-d74d11a0719948d4.webp)

```typescript
while (i <= e1 && i <= e2) {
  const n1 = c1[i],
    n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]))
  // 新旧节点是否是同一类型vnode
  if (isSameVNodeType(n1, n2)) {
    patch(
      n1,
      n2,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    // 如果不是同一类型 则跳出循环
    break
  }
  i++
}
```

> 当 i = 0 时，比较第 0 个索引，发现 C1 的 A 节点 与 C2 节点的 A 节点 是同一类型的元素，则会对新旧的 A 节点进行 patch 操作，在这里进行 patch 能够递归的去访问 A 节点下的所有子节点，patch 完成后递增索引 i 。
> 发现 C1 的 B 节点与 C2 的 B 节点也是同一类型的元素，与之前一样对 B 节点进行 patch 递归后递增 i 索引
> 当比较第三个子节点时，会发现 C1 的 C 节点与 C2 的 D 节点并不是同一类型的节点，所以会 break 跳出新前与旧前的比较循环，于是新前与旧前的比较结束

#### 新后与旧后

![新后与旧后](https://github.com/474366498/vue3/blob/main/read~md/patch/1634490-3d24729a5de6eafe.webp)

```typescript
while (i <= e1 && i <= e2) {
  const n1 = c1[e1],
    n2 = (c2[e2] = optimized
      ? cloneIfMounted(c2[e2] as VNode)
      : normalizeVNode(c2[e2]))
  //比较新旧节点是否是同一类型
  if (isSameVNodeType(n1, n2)) {
    patch(
      n1,
      n2,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else {
    // 如果不是同一类型 跳出循环
    break
  }
  // 尾索引递减
  e1--
  e2--
}
```

> 从末尾开始，C1 是 C 节点，而 C2 也是 C 节点，两个节点的类型相同，开始进行 patch 比较，待 patch 完成后，新旧子节点的末尾索引 - 1。
> 进行第二次比较，C1 的末尾是 B 节点，C2 的末尾是 B 节点，类型相同，进行 patch，之后递减尾部索引。
> 进行第三次比较，C1 的末尾节点是 A，C2 的末尾节点是 E，类型不同，break 跳出新后与旧后的比较循环。

#### 常规顺序的新子节点挂载

![常规顺序的新子节点挂载](https://github.com/474366498/vue3/blob/main/read~md/patch/1634490-e9c0da8e31e6d5bf.webp)

```typescript
// 旧节点遍历完
if (i > e1) {
  // 新节点还有元素未遍历完
  if (i <= e2) {
    const nextPos = e2 + 1,
      // 取得锚点元素
      anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
    // 遍历剩余的新节点
    while (i <= e2) {
      // 进行对比  path 第一个参数为null 代表没有旧项目点直接进行插入操作
      path(
        null,
        (c2[i] = optimized
          ? cloneIfMounted(c2[i] as VNode)
          : normalizeVNode(c2[i])),
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      i++
    }
  }
}
```

> 当我们完成了前两轮的比较后，此时往往能在常规的序号上发现一些新子节点中存在，而旧子节点中没有的元素，此时就需要将这些新增的子节点插入
> 当新前与旧前的比较完成后，此时索引 i 已经递增的超过 C1 子节点的长度，此时 i = 2，并且 i 还小于等于 C2 子节点的长度，于是可以判定在新子节点中还有节点没有被遍历到，此时旧子节点已经全部遍历完，所以将未被遍历的子节点全部插入即可

#### 常规顺序的移除多余节点

![常规顺序的移除多余节点](https://github.com/474366498/vue3/blob/main/read~md/patch/1634490-53e2272efe96b0e9.webp)

```typescript

else if (i > e2) {  // 新节点遍历完了
  while(i<= e1 ) {
    // 循环移除旧节点
    unmount(c[i],parentComponent,parentSuspense,true)
    i++
  }
}

```

> 当新子节点已经全部遍历完时，如果此时旧子节点还有元素未被遍历，那么可以判定剩余的旧子节点已经不再需要了，所以直接将剩余旧子节点移除即可

#### 未知顺序的子节点比较

![未知顺序的子节点比较](https://github.com/474366498/vue3/blob/main/read~md/patch/1634490-fb17484909a6eff5.webp)

```typescript
//新旧节点的新索引
const s1 = i,
  s2 = i
// 用于存放新节点下标位置 ([vnode.key : index] ,...)
const keyToNewIndexMap: Map<string | number | symbol, number> = new Map()
for (i = s2; i <= e2; i++) {
  const nextChild = (c2[i] = optimized
    ? cloneIfMounted(c2[i] as VNode)
    : normalizeVNode(c2[i]))
  if (nextChild.key != null) {
    if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
      warn('key重复提醒')
    }
  }
  keyToNewIndexMap.set(nextChild.key, i)
}

/*
  遍历旧节点 尝试 patch比较需要被patch的节点 并移除不会再出现的子节点
*/
let j,
  patched = 0,
  toBePatched = e2 - s2 + 1
let moved = false
// 用于跟踪是否有节点发生移动
let maxNewIndexSoFar = 0
// 用于确定最长递增子序列
const newIndexToOldIndexMap = new Array(toBePatched)
for (i = 0; i < toBePatched; i++) newIndexToOldMap[i] = 0

for (i = s1; i < e1; i++) {
  const prevChild = c1[i]
  if (patched >= toBePatched) {
    // 所有新节点都被patch 移除剩下的旧节点
    unmount(prevChild, parentComponent, parentSuspense, true)
    continue
  }
  let newIndex
  if (prevChild.key != null) {
    newIndex = keyToNewIndexMap.get(prevChild.key)
  } else {
    // 对于找不到key的节点 尝试去定位 相同 type 节点
    for (j = s2; j <= e2; j++) {
      if (
        newIndexToOldIndexMap[j - s2] === 0 &&
        isSameVNodeType(prevChild, c2[j] as VNode)
      ) {
        newIndex = j
        break
      }
    }
  }
  // 如果旧节点不能匹配到对应的新节点 ， 则移除旧节点
  if (newIndex == undefined) {
    unmount(prevChild, parentComponent, parseSuspense, true)
  } else {
    // 在newIndexToOldIndexMap 记录下被patch的节点索引
    newIndexToOldIndexMpa[newIndex - s2] = i + 1
    // 如果 newIndex的索引大于最远移动的索引 则更新
    if (newIndex >= maxNewIndexSoFar) {
      maxNewIndexSoFar = newIndex
    } else {
      // 标记moved 为true
      moved = true
    }
    // 对新旧节点进行patch
    patch(
      prevChild,
      c2[newIndex] as VNode,
      container,
      null,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
    patched++
  }
}
```

> 声明 s1、s2 两个变量，并将此时遍历的前序索引 i 赋值给 s1、s2。s1、s2 分别表示新旧子节点的起始索引

> 以 s2 为起始节点，e2 为结束条件，遍历新子节点，用新子节点中子节点的 key 为键，索引 i 为值，生成一个 Map 对象, 存放原始索引。

> > 如果此时发现有子节点中有重复的键，就会发出一个所有 Vue 开发者都很熟悉的警告:Duplicate keys found during update xxx, Make sure keys are unique。

> 声明变量 toBePatched，计算还有几个节点需要被 patch。声明变量 patched = 0，记录 patch 的节点数

> 声明一个 newIndexToOldIndexMap 的数组，用于后续确定最长递增子序列，newIndexToOldIndexMap 数组大小为 toBePatched 的长度，并将数组内所有元素初始化为 0
>
> > newIndexToOldIndexMap，形式是 Map\<newIndex, oldIndex\>
> > 需要注意的是里面存储的 oldIndex 是索引是偏移 +1 的
> > oldIndex = 0 是一个特殊值，表示新子节点中没有对应的旧子节点

> 遍历旧子节点，将当前被遍历的子节点标记为 prevChild

> > 如果 patched 大于等于 toBePatched，说明需要被 patch 的节点已经全部比较完毕，则可以将剩余的 prevChild 移除。
> > 否则声明变量 newIndex。
> > 如果 prevChild 的 key 不为空，则从 keyToIndexMap 中取 prevChild.key 的值，将获取到的值赋值给 newIndex。
> > 如果 newIndex 没有值，则说明在新子节点中没有对应的旧子节点，直接移除 prevChild 旧子节点。
> > 否则在 newIndexToOldIndexMap 中存下新的索引，并标记当前索引移动的最远位置或增加移动标记，并对新旧子节点进行 patch 比较。
> > 在完成 patch 后，将 patched 计数递增。

```typescript
/* 移动 挂载 */
// 当节点被移动时，创建最长递增子序列
const increasingNewIndexSequence = moved
  ? getSequence(newIndexToOldIndexMap)
  : EMPTY_ARR
j = increasingNewIndexSequence.length - 1

// 为了能方便的获取锚点 选择从后向前遍历
for (i = toBePatched - 1; i >= 0; i--) {
  const newIndex = s2 + i,
    nextChild = c2[nextIndex] as VNode
  const anchor =
    nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
  if (newIndexToOldIndexMap[i] === 0) {
    // 如果在newIndexToOldIndexMap中找不到对应的索引 则新增节点
    patch(
      null,
      nextChild,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      slotScopeIds,
      optimized
    )
  } else if (moved) {
    // 如果不是一个稳定的子序列或者当前节点不在递增子序列上 就移动节点
    if (j < 0 || i !== increasingNewIndexSequence[j]) {
      move(nextChild, container, anchor, MoveType.REORDER)
    } else {
      j--
    }
  }
}
```

> 如果有 moved 标记，则从 newIndexToOldIndexMap 中找到最长递增子序列，并将 j 赋值为最长递增子序列数组的末尾索引

> 从后往前的遍历新子节点，这样可以使我们确定锚点元素的位置

> 声明 newIndex = s2 + i，即为最后一个需要被 patch 的节点

> 获取锚点元素

> 如果这个需要被 patch 的节点，i 索引在 newIndexToOldIndexMap 中的值为 0。还记得笔者之前提示的，0 是一个特殊值，代表该节点在旧子节点中没有对应的节点吧。那么对于没有对应节点的元素，我们就对它采用插入操作

> 如果 newIndexToOldIndexMap 中有对应索引，但是存在 moved 标记，说明节点可能移动，应该继续判断
>
> > 如果 j < 0，说明最长递增子序列中的所有节点都已经处理过。或者当索引 i 不等于最长增长子序列中索引 j 对应的值时，说明该节点并不处在一个相对稳定的位置，则需要进行移动操作
> > 如果满足上述条件，j 索引递减，不用处理该节点