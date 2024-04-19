


export function parseQuery() {

}

export function stringifyQuery() {

}


export function normalizeQuery(query) {

  const normalizedQuery = {}

  for (let key in query) {
    let value = query[key]
    if (value !== undefined) {
      normalizedQuery[key] = isArray(value)
        ? value.map(v => (v == null ? null : '' + v))
        : value == null
          ? value
          : '' + value
    }
  }


  return normalizedQuery
}
