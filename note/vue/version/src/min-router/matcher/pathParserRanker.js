import { assign } from "../utils"

const BASE_PARAM_PATTERN = '[^/]+?'
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true,
}
const _multiplier = 10
const BonusCustomRegExp = 10
const PathScore = {
  _multiplier,
  Root: 9 * _multiplier, // just /
  Segment: 4 * _multiplier, // /a-segment
  SubSegment: 3 * _multiplier, // /multiple-:things-in-one-:segment
  Static: 4 * _multiplier, // /static
  Dynamic: 2 * _multiplier, // /:someId
  BonusCustomRegExp: 1 * _multiplier, // /:someId(\\d+)
  BonusWildcard: -4 * _multiplier - BonusCustomRegExp, // /:namedWildcard(.*) we remove the bonus added by the custom regexp
  BonusRepeatable: -2 * _multiplier, // /:w+ or /:w*
  BonusOptional: -0.8 * _multiplier, // /:w? or /:w*
  // these two have to be under 0.1 so a strict /:page is still lower than /:a-:b
  BonusStrict: 0.07 * _multiplier, // when options strict: true is passed, as the regex omits \/?
  BonusCaseSensitive: 0.025 * _multiplier, // when options strict: true is passed, as the regex omits \/?
}
const Static = 0,
  Param = 1,
  Group = 2
const TokenType = {
  Static,
  Param,
  Group,
}
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g

export function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions)

  const score = []
  let pattern = options.start ? '^' : ''

  const keys = []

  for (let segment of segments) {
    const segmentScores = segment.length ? [] : [90]
    if (options.strict && !segment.length) pattern += '/'
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex]
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0)

      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += '/'
        pattern += token.value.replace(REGEX_CHARS_RE, '\\$&')
        subSegmentScore += PathScore.Static
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token
        keys.push({
          name: value,
          repeatable,
          optional
        })
        const re = regexp ? regexp : BASE_PARAM_PATTERN
        if (re !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp
          try {
            new RegExp(`(${re})`)
          } catch (err) {
            throw new Error(
              `Invalid custom RegExp for param "${value}" (${re}): ` +
              err?.message
            )
          }
        }

        let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`

        if (!tokenIndex) {
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : '/' + subPattern
        }

        if (optional) subPattern += '?'

        pattern += subPattern

        subSegmentScore += PathScore.Dynamic
        if (optional) subSegmentScore += PathScore.BonusOptional
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable
        if (re === '.*') subSegmentScore += PathScore.BonusWildcard

      }
      segmentScores.push(subSegmentScore)
    }
    score.push(segmentScores)
  }

  if (options.strict && options.end) {
    const i = score.length - 1
    score[i][score[i].length - 1] += PathScore.BonusStrict
  }

  if (!options.strict) pattern += '/?'
  if (options.end) pattern += '$'
  else if (options.strict) pattern += '(?:/|$)'

  const re = new RegExp(pattern, options.sensitive ? '' : 'i')

  function parse(path) {
    const match = path.match(re)
    const params = {}
    if (!match) return null
    for (let i = 1; i < match.length; i++) {
      let value = match[i] || '', key = keys[i - 1]
      params[key.name] = value && key.repeatable ? value.split('/') : value
    }
    return params
  }

  function stringify(params) {
    let path = ''
    let avoidDuplicatedSlash = false

    for (let segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith('/')) path += '/'
      avoidDuplicatedSlash = false

      for (let token of segment) {
        if (token.type === TokenType.Static) {
          path += token.value
        } else if (token.type === TokenType.Param) {
          let { value, repeatable, optional } = token
          let param = value in params ? params[value] : ''
          if (isArray(param) && !repeatable) {
            console.error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`)
          }

          const text = isArray(param) ? param.join('/') : param
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith('/')) path = path.slice(0, -1)
                else avoidDuplicatedSlash = true
              }
            } else {
              throw new Error(`Missing required param "${value}"`)
            }
          }
          path += text
        }
      }
    }
    return path || '/'
  }

  return {
    re,
    score,
    keys,
    parse,
    stringify
  }
}