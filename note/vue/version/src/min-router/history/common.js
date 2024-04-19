

const BEFORE_HASH_RE = /^[^#]+#/
export function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, '#') + location
}
