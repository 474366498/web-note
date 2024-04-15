// import { createRouterMatcher } from "vue-router";

import { createRouterMatcher } from './matcher/index'
import { parseQuery as originalParseQuery, stringifyQuery as originalStringifyQuery } from 'vue-router'

export function createRouter(options) {
  // console.log(7, options.history)
  // debugger
  const matcher = createRouterMatcher(options.routes, options)
  const parseQuery = options.parseQuery || originalParseQuery
  const stringifyQuery = options.stringifyQuery || originalStringifyQuery

  console.log(8, matcher, options, parseQuery, stringifyQuery)
  const routerHistory = options.history
  return {
    options
  }
}