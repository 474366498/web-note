

import data from './products.json'
console.log(4444, data.length)
/* 
event :
H3Event {
  __is_event__: true,
  node:
   { req:
      IncomingMessage {
        __unenv__: [Object],
        _events: [Object: null prototype] {},
        _maxListeners: undefined,
        readableEncoding: null,
        readableEnded: true,
        readableFlowing: false,
        readableHighWaterMark: 0,
        readableLength: 0,
        readableObjectMode: false,
        readableAborted: false,
        readableDidRead: false,
        closed: false,
        errored: null,
        readable: false,
        destroyed: false,
        aborted: false,
        httpVersion: '1.1',
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        complete: true,
        connection: [Socket],
        socket: [Socket],
        headers: [Object],
        trailers: {},
        method: 'POST',
        url: '/api/products',
        statusCode: 200,
        statusMessage: '',
        body: null,
        originalUrl: '/api/products' },
     res:
      ServerResponse {
        __unenv__: true,
        _events: [Object: null prototype] {},
        _maxListeners: undefined,
        writable: true,
        writableEnded: false,
        writableFinished: false,
        writableHighWaterMark: 0,
        writableLength: 0,
        writableObjectMode: false,
        writableCorked: 0,
        closed: false,
        errored: null,
        writableNeedDrain: false,
        destroyed: false,
        _data: undefined,
        _encoding: 'utf-8',
        statusCode: 200,
        statusMessage: '',
        upgrading: false,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        useChunkedEncodingByDefault: false,
        sendDate: false,
        finished: false,
        headersSent: false,
        strictContentLength: false,
        connection: null,
        socket: null,
        req: [IncomingMessage],
        _headers: {} } },
  web: undefined,
  context:
   { _nitro: { routeRules: {} },
     nitro: { errors: [], runtimeConfig: [Object] },
     matchedRoute: { path: '/api/products', handlers: [Object] },
     params: {},
     _payloadReducers:
      { NuxtError: [Function: NuxtError],
        EmptyShallowRef: [Function: EmptyShallowRef],
        EmptyRef: [Function: EmptyRef],
        ShallowRef: [Function: ShallowRef],
        ShallowReactive: [Function: ShallowReactive],
        Ref: [Function: Ref],
        Reactive: [Function: Reactive],
        Island: [Function (anonymous)] } },
  _method: 'POST',
  _path: '/api/products',
  _headers: undefined,
  _requestBody: undefined,
  _handled: false,
  fetch: [Function (anonymous)],
  '$fetch': [Function (anonymous)],
  waitUntil: [Function (anonymous)],
  captureError: [Function (anonymous)] }

*/
export default defineEventHandler((event) => {
  console.log('products index', event)
  // const method = getMethod(event).toUpperCase(),
  //   body = readRawBody(event)
  // console.log('products index method:', method)
  // console.log('products index body:', body)
  // console.log(1066666666666, data.length)
  return {
    data
  }
})