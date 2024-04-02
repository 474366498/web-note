


export class AxiosError extends Error {
  constructor(msg, config, code, request, response) {
    super(msg)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.AxiosError = true
  }
}


export function createError(msg, config, code, request, response) {
  console.log(17, msg)
  return new AxiosError(msg, config, code, request, response)
}

