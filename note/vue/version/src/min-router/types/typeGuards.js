export function isRouteLocation(route) {
  return typeof route === 'string' || (route && typeof route === 'object')
}

export function isRouteName(name) {
  return typeof name === 'string' || typeof name === 'symbol'
}