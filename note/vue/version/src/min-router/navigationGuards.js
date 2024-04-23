



export function extractComponentsGuards(matched, guardType, to, from) {

  const guards = []
  // debugger
  for (let record of matched) {
    if (!record.components && !record.children.length) {
      console.warn(`Record with path "${record.path}" is either missing a "component(s)"` +
        ` or "children" property.`)
    }

    for (let name in record.components) {
      let rawComponent = record.components[name]

      if (guardType !== 'beforeRouteEnter' && !record.instances[name]) continue

      if (isRouteComponent(rawComponent)) {
        const options = rawComponent?.__vccOpts || rawComponent
        const guard = options[guardType]
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name))
      } else {
        let componentPromise = rawComponent

        if (!('catch' in componentPromise)) {
          console.warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`)
          componentPromise = Promise.resolve(componentPromise)
        }

        guards.push(() =>
          componentPromise.then(resolved => {

          })
        )

      }
    }

  }

  return guards
}





export function guardToPromiseFn() {

}