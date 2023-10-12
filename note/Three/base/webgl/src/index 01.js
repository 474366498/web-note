
import {
  Matrix4,
  Vector3,
  Vector4
} from './WebGL/cuon-matrix'
import {
  initShaders,
  createProgram,
  loadShader,
  getWebGLContext
} from './WebGL/cuon-utils'

import WebDebug from './WebGL/webgl-debug'

import {
  create3DContext,
  setupWebGL
} from './WebGL/webgl-utils'

let canvas = document.getElementById('webgl')

let gl = getWebGLContext(canvas, { debug: true })

console.log(gl)
gl.clearColor(1, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)