// import { createRouterMatcher } from "vue-router";

import { RouterLink, RouterView, isNavigationFailure, parseQuery as originalParseQuery, stringifyQuery as originalStringifyQuery } from 'vue-router'
import { computed, nextTick, shallowRef, unref } from 'vue'

import { createRouterMatcher } from './matcher/index'
import { parseURL, stringifyURL, isSameRouteLocation, isSameRouteRecord } from './location.js'
import { encodeParam, decode, encodeHash } from './encoding'
import { normalizeQuery } from './query'
import { START_LOCATION_NORMALIZED } from './types'
import { applyToParams, assign, useCallbacks } from './utils'
import {
  extractComponentsGuards,
  guardToPromiseFn
} from './navigationGuards'

export function createRouter(options) {
  console.log(7, options)
  // debugger
  const matcher = createRouterMatcher(options.routes, options)
  const parseQuery = options.parseQuery || originalParseQuery
  const stringifyQuery = options.stringifyQuery || originalStringifyQuery
  const routerHistory = options.history

  const beforeGuards = useCallbacks()
  const beforeResolveGuards = useCallbacks()
  const afterGuards = useCallbacks()
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED)
  let pendingLocation = START_LOCATION_NORMALIZED

  const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue)

  const encodeParams = applyToParams.bind(null, encodeParam),
    decodeParams = params => applyToParams.bind(null, decode)

  console.log(19, currentRoute, routerHistory)

  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value)
    console.log('resolve', parseQuery, rawLocation, currentLocation)
    if (typeof rawLocation === 'string') {
      const locationNormalized = parseURL(parseQuery, rawLocation, currentLocation.path)
      console.log('locationNormalized', locationNormalized, matcher)
      const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation)
      const href = routerHistory.createHref(locationNormalized.fullPath)
      // console.log(matchedRoute, href, normalizeQuery)

      return assign(locationNormalized, matchedRoute, {
        params: decodeParams(matchedRoute.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: undefined,
        href
      })
    }

    let matcherLocation
    if ('path' in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery, rawLocation.path, currentLocation.path).path
      })
    } else {
      const targetParams = assign({}, rawLocation.params)
      for (let key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key]
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      })
      currentLocation.params = encodeParams(currentLocation.params)
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation)
    const hash = rawLocation.hash || ''

    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params))

    const fullPath = stringifyURL(
      stringifyQuery,
      assign(
        {},
        rawLocation,
        {
          hash: encodeHash(hash),
          path: matchedRoute.path
        }
      )
    )

    const href = routerHistory.createHref(fullPath)

    return assign(
      {
        fullPath,
        hash,
        query: stringifyQuery === originalStringifyQuery ? normalizeQuery(rawLocation.query) : (rawLocation.query || {})
      },
      matchedRoute,
      { redirectedFrom: undefined, href }
    )
  }

  function locationAsObject(to) {
    return typeof to === 'string'
      ? parseURL(parseQuery, to, currentRoute.value.path)
      : assign({}, to)
  }

  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return {
        type: 8,
        params: { from, to }
      }
    }
  }

  function push(to) {
    return pushWithRedirect(to)
  }

  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }))
  }

  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1]
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched
      let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect

      console.log(121, newTargetLocation)
      if (typeof newTargetLocation === 'string') {
        newTargetLocation = newTargetLocation.includes('?') || newTargetLocation.includes('#')
          ? (newTargetLocation = locationAsObject(newTargetLocation))
          : { path: newTargetLocation }
        newTargetLocation.params = {}
      }
      return assign(
        {
          query: to.query,
          hash: to.hash,
          params: 'path' in newTargetLocation ? {} : to.params
        },
        newTargetLocation
      )
    }
  }

  function pushWithRedirect(to, redirectedFrom) {

    const targetLocation = (pendingLocation = resolve(to))
    const from = currentRoute.value
    const data = to?.state
    const force = to?.force
    const replace = to.replace === true

    const shouldRedirect = handleRedirectRecord(targetLocation)
    if (shouldRedirect) {
      return pushWithRedirect(
        assign(
          locationAsObject(shouldRedirect),
          {
            state: typeof shouldRedirect === 'object'
              ? assign({}, data, shouldRedirect.state)
              : data,
            force,
            replace
          }
        ),
        redirectedFrom || targetLocation
      )
    }

    const toLocation = targetLocation
    toLocation.redirectedFrom = redirectedFrom
    // debugger
    let failure

    if (!force && isSameRouteLocation(stringifyQuery, from, targetLocation)) {
      failure = {
        type: 16,
        params: { to: toLocation, from }
      }

      handleScroll(from, from, true, false)
    }

    return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
      .catch(error =>
        isNavigationFailure(error)
          ? isNavigationFailure(error, 2)
            ? error
            : markAsReady(error)
          : triggerError(error, toLocation, from)
      )
      .then(failure => {

      })

  }


  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from)
    return error ? Promise.reject(error) : Promise.resolve()
  }

  function navigate(to, from) {
    let guards

    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from)

    console.log(211, leavingRecords, updatingRecords, enteringRecords)
    guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from)

    debugger
    for (let record of leavingRecords) {
      record.leavingRecords.forEach(guard => {
        guards.push(guardToPromiseFn(guard, to, from))
      })
    }

    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from)

    guards.push(canceledNavigationCheck)

  }


  let removeHistoryListener

  function setupListeners() {

  }


  let readyHandlers = useCallbacks()
  let errorHandlers = useCallbacks()
  let ready

  function triggerError(error, to, from) {
    markAsReady(error)
    const list = errorHandlers.list()
    if (list.length) {
      list.forEach(handler => handler(error, to, from))
    } else {
      console.warn(error)
    }
    return Promise.reject(error)
  }

  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      readyHandlers.add([resolve, reject])
    })
  }


  function markAsReady(err) {
    if (!ready) {
      ready = !err
      setupListeners()
      readyHandlers.list()
        .forEach(([resolve, reject]) => (err ? reject(err) : resolve()))
      readyHandlers.reset()
    }
    return err
  }

  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options
    if (!scrollBehavior) return Promise.resolve()

    const scrollPosition = (!isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)))
      || ((isFirstNavigation || !isPush) && history.state && history.state.scroll)
      || null

    return nextTick()
      .then(() => scrollBehavior(to, from, scrollPosition))
      .then(position => position && scrollToPosition(position))
      .catch(err => triggerError(err, to, from))

  }


  const go = delta => routerHistory.go(delta)

  var started = false
  const installedApps = new Set()

  const router = {
    currentRoute,
    options,
    go,
    install(app) {
      const router = this
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)
      app.config.globalProperties.$router = router

      if (!started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true
        console.log('router install', routerHistory)

        push(routerHistory.location).catch(error => {
          console.warn(`Unexpected error when starting the router:`, error)
        })
      }

      const reactiveRoute = {}
      for (let key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key])
      }

      Object.defineProperty(app.config.globalProperties, '$route', {
        enumerable: true,
        get: () => unref(currentRoute)
      })
    }
  }

  return router
}


function runGuardQueue(guards) {

}

function extractChangingRecords(to, from) {
  const leavingRecords = [],
    updatingRecords = [],
    enteringRecords = []

  for (let i = 0; i < length; i++) {
    const recordFrom = from.matched[i]
    if (recordFrom) {
      if (to.matched.find(record => isSameRouteRecord(record, recordFrom))) {
        updatingRecords.push(recordFrom)
      } else {
        leavingRecords.push(recordFrom)
      }
    }
    const recordTo = to.matched[i]
    if (recordTo) {
      if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo)
      }
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ]
}
