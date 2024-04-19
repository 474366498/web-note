

import { assign } from '../utils'
import { tokensToParser } from './pathParserRanker'
import { tokenizePath } from './pathTokenizer'

export function createRouteRecordMatcher(record, patent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options)
  console.log(5, parser)

  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  })

  if (parent) {
    if (!matcher.record.aliasOf === !parent?.record?.aliasOf) {
      (parent.children || (parent.children = [])).push(matcher)
    }

  }
  return matcher
} 
