// import { createRouterMatcher } from "vue-router";

import { createRouterMatcher } from './matcher/index'


export function createRouter(options) {
  // console.log(7, options.history)
  // debugger
  const matcher = createRouterMatcher(options.routes, options)
  console.log(8, matcher, options)
  return {
    options
  }
}