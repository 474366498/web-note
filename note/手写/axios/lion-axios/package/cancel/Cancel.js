

export default class Cancel {
  constructor(message) {
    this.message = message
  }

}

export function isCancel(v) {
  return v instanceof Cancel
}