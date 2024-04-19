// import { createRouterMatcher } from "vue-router";

import { RouterLink, RouterView, parseQuery as originalParseQuery, stringifyQuery as originalStringifyQuery } from 'vue-router'
import { computed, shallowRef, unref } from 'vue'

import { createRouterMatcher } from './matcher/index'
import { parseURL, stringifyURL } from './location.js'
import { encodeParam, decode, encodeHash } from './encoding'
import { normalizeQuery } from './query'
import { START_LOCATION_NORMALIZED } from './types'
import { applyToParams, assign } from './utils'

function useCallbacks() { }

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

    }
  }

  function pushWithRedirect(to, redirectedFrom) {
    // console.log('pushWithRedirect', to)

    const targetLocation = (pendingLocation = resolve(to))
    const from = currentRoute.value
    const data = to?.state
    const replace = to.replace === true

    const shouldRedirect = handleRedirectRecord(targetLocation)
    console.log(57, targetLocation)

  }




  var started = false
  const installedApps = new Set()

  const router = {
    currentRoute,
    options,
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