

import { assign, noop } from "../utils"
import { createRouteRecordMatcher } from './pathMatcher'
import { isRouteName } from '../types/index'


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

    if ('alias' in record) {
      const aliases = typeof router.alias === 'string' ? [record.alias] : record.alias
      for (const alias of aliases) {
        normalizedRecords.push(
          assign({}, mainNormalizedRecord, {
            components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
            path: alias,
            aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          })
        )
      }
    }

    let matcher
    let originalMatcher
    console.log(45, normalizedRecords)
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord
      if (parent && path[0] !== '/') {
        const parentPath = parent.record.path
        const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/'
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path)
      }
      if (normalizedRecord.path === '*') {
        throw new Error(
          'Catch all routes ("*") must now be defined using a param with a custom regexp.\n' +
          'See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.'
        )
      }

      matcher = createRouteRecordMatcher(normalizedRecord, parent, options)
      console.log(62, matcher)
      if (originalRecord) {
        originalRecord.alias.push(matcher)

      } else {
        originalMatcher = originalMatcher || matcher
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher)
        if (isRootAdd && record.name && !isAliasRecord(matcher)) removeRoute(record.name)
      }
      // 路由 子路由
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children
      }

      originalRecord = originalRecord || matcher

      if ((matcher.record.components && Object.keys(matcher.record.components).length) || matcher.record.name || matcher.record.redirect) {
        // console.log('insert')
        insertMatcher(matcher)
      }

    }

    return originalMatcher ? () => {
      removeRoute(originalMatcher)
    } : noop


  }

  function removeRoute(matcherRef) {
    console.log('remove')
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef)
      if (matcher) {
        matcherMap.delete(matcherRef)
        matchers.splice(matchers.indexOf(matcher), 1)
        matcher.children.forEach(removeRoute)
        matcher.alias.forEach(removeRoute)
      }
    } else {
      const index = matchers.indexOf(matcherRef)
      if (index > -1) {
        matchers.splice(index, 1)
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name)
        matcherRef.children.forEach(removeRoute)
        matcherRef.alias.forEach(removeRoute)
      }
    }
  }

  function insertMatcher(matcher) {
    console.log('insert', matcher)
    let i = 0

  }

  routes.forEach(route => addRoute(route))

  return {
    addRoute,
    removeRoute,

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

function isAliasRecord(record) {
  // debugger
  while (record && record.record) {
    if (record.record.aliasOf) return true
    record = record.parent
  }
  return false
}
