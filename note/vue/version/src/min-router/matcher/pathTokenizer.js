

const ROOT_TOKEN = {
  type: 0,
  value: ''
}

export function tokenizePath(path) {
  if (!path) return [[]]
  if (path === '/') return [[ROOT_TOKEN]]
  if (!path.startsWith('/')) {
    throw new Error(`${path}`)
  }
  let state = 0
  let prevState = state

  const tokens = []
  /**
   * 先不管
   */

  return tokens
}