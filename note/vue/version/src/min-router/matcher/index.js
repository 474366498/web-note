


function mergeOptions(defaults, partialOptions) {
  const options = {}
  for (const k in defaults) {
    options[k] = k in partialOptions ? partialOptions[k] : defaults[k]
  }
  return options
}



export function createRouterMatcher(routes, globalOptions) {
  const matchers = [], matcherMap = new Map()
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions)

  console.log(21, routes, globalOptions)

  const addRoute = (record, parent = undefined, originalRecord = undefined) => {
    const isRootAdd = !originalRecord
    const mainNormalizedRecord = normalizeRouteRecord(record)
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record
    const options = mergeOptions(globalOptions, record)
    const normalizedRecords = [mainNormalizedRecord]

  }

  routes.forEach(route => addRoute(route))

  return {

  }

}


export function normalizeRouteRecord(route) {
  return {
    path: route.path,
    redirect: route.redirect,
    name: route.name,
    meta: route.meta || {},
    aliasOf: undefined,
    beforeEnter: route.beforeEnter,
    props: normalizeRecordProps(route),
    children: route.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallback: {},
    components: 'components' in route
      ? route.components || {}
      : route.component
  }
}

function normalizeRecordProps(route) {
  const propsObject = {}
  const props = route.props || false
  if ('component' in route) {
    propsObject.default = props
  } else {
    for (let n in route.components) {
      propsObject[n] = typeof props === 'boolean' ? props : props[n]
    }
  }
  return propsObject
}