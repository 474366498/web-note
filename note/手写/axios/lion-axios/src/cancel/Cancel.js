export default class Cancel {
  message;

  constructor(message) {
    this.message = message;
  }
}

export function isCancel(value) {
  return value instanceof Cancel;
}
