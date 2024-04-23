

export * from './callbacks'


export const assign = Object.assign

export const noop = () => { }

// export function assign() { }

export function applyToParams(fn, params) {
  const newParams = {}

  for (let key in params) {
    let value = params[key]
    newParams[key] = isArray(value) ? value.map(fn) : fn(value)
  }

  return newParams
}

export const isArray = Array.isArray 
