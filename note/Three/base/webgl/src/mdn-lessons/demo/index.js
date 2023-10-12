
import { MDN } from '../../mdn/index'

console.log(4, MDN)

function WebGLBox() {

  this.canvas = document.getElementById('canvas')
  this.canvas.width = window.innerWidth
  this.canvas.height = window.innerHeight

  this.gl = MDN.createContext(canvas)

  var gl = this.gl

  this.webglProgram = MDN.createWebGLProgramFromIds(gl, 'vertex-shader', 'fragment-shader')
  gl.useProgram(this.webglProgram)

  this.positionLocation = gl.getAttribLocation(this.webglProgram, 'position')
  this.colorLocation = gl.getUniformLocation(this.webglProgram, 'color')

  gl.enable(gl.DEPTH_TEST)
}

WebGLBox.prototype.draw = function (settings) {

  console.log(27, settings)

  let {
    top,
    bottom,
    left,
    right,
    depth,
    color
  } = settings

  let data = new Float32Array([
    left, bottom, depth,
    right, bottom, depth,
    left, top, depth,

    left, top, depth,
    right, bottom, depth,
    right, top, depth
  ])

  var gl = this.gl
  console.log(49, gl)
  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
  console.log(53, this.positionLocation)
  gl.enableVertexAttribArray(this.positionLocation)
  gl.vertexAttribPointer(this.positionLocation, 3, gl.FLOAT, false, 0, 0)

  gl.uniform4fv(this.colorLocation, color)

  gl.drawArrays(gl.TRIANGLES, 0, 6)

}

var box = new WebGLBox()

box.draw({
  top: .5,
  bottom: -.5,
  left: -.5,
  right: .5,

  depth: 0,
  color: [1, .4, .4, 1] // red
})

box.draw({
  top: .9,
  bottom: 0,
  left: -.9,
  right: .9,

  depth: .5,
  color: [.4, 1, .4, 1] // green
})

box.draw({
  top: .91,
  bottom: -.91,
  left: -.91,
  right: .91,

  depth: 1.75,
  color: [.4, .4, 1, 1] // blue
})

