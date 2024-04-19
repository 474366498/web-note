


export function parseURL(fn, location, currentLocation) {
  // console.log(5, location, currentLocation)
  let path, query, searchString = '', hash = ''

  const hashPos = location.indexOf('#'), searchPos = location.indexOf('?')

  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1
  }
  if (searchPos > -1) {
    path = location.slice(0, searchPos)
    searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length)
    query = fn(searchString)
  }

  if (hashPos > -1) {
    path = path || location.slice(0, hashPos)
    hash = location.slice(hashPos, location.length)
  }
  // console.log(23, path, location, currentLocation)
  path = resolveRelativePath(path ? path : location, currentLocation)

  return {
    fullPath: path + (searchString && '?') + searchString + hash,
    path,
    query,
    hash
  }

}

export function stringifyURL(stringifyQuery, location) {
  let query = location.query ? stringifyQuery(location.query) : ''
  return location.path + (query && '?') + query + (location.hash || '')
}


export function resolveRelativePath(to, from) {
  // console.log(35, to, from)
  if (to.startsWith('/')) return to
  if (!from.startsWith('/')) {
    return to
  }

  if (!to) return from

  const fromSegments = from.split('/')
  const toSegments = to.split('/')
  const lastToSegment = toSegments[toSegments.length - 1]

  if (lastToSegment === '..' || lastToSegment === '.') {
    toSegments.push('')
  }

  let position = fromSegments.length - 1
  let toPosition
  let segment

  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition]
    // we stay on the same position  我们保持在相同的位置
    if (segment === '.') continue
    // go up in the from array  在from数组中向上移动
    if (segment === '..') {
      // we can't go below zero, but we still need to increment toPosition   我们不能低于0，但我们仍然需要增加到Position
      if (position > 1) position--
    }
    // we reached a non-relative path, we stop here   我们到达了一个非相对路径，我们停在这里
    else break


  }

  return (fromSegments.slice(0, position).join('/') + '/' + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join('/'))

}