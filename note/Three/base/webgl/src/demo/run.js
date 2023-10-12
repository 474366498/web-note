
import { initBuffers } from './buffers.js'
import { drawScene } from './draw.js'

console.log(initBuffers,
  drawScene)

// let script = document.createElement('script')
// script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js'
// script.setAttribute('integrity', 'sha512-zhHQR0/H5SEBL3Wn6yYSaTTZej12z0hVZKOv3TwCUXT1z5qeqGcXJLLrbERYRScEDDpYIJhPC1fk31gqR783iQ==')
// script.setAttribute('crossorigin', 'anonymous')
// script.setAttribute('defer', true)

// document.head.insertAdjacentElement('beforeend', script)


// setTimeout(() => {
run()
// }, 5e1);

function run() {
  const canvas = document.getElementById('webgl')
  const gl = canvas.getContext('webgl')
  console.log(22, gl)
  let glMap = new Map()
  for (let key in gl) {
    if (typeof gl[key] === 'function') {
      console.log(`gl ${key} : ${gl[key]}`)
    } else if (typeof gl[key] === 'number') {
      glMap.set(key, gl[key])
    }
  }
  console.log(33, glMap)

  if (!gl) return

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 顶点着色器  片段着色器
  const vsSource = `
    attribute vec4 aVertexPosition ; 
    uniform mat4 uModelViewMatrix ;
    uniform mat4 uProjectionMatrix ;
    void main () {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition ;
    }
  ` ,
    fsSource = `
    void main () {
      gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    }
    `

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
  console.log(43, shaderProgram, mat4)
  if (!shaderProgram) return
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
    },
  }

  const buffers = initBuffers(gl)

  drawScene(gl, programInfo, buffers)
}

function initShaderProgram(gl, vsSource, fsSource) {
  console.log(54, gl, vsSource, fsSource)
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource),
    fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)
  console.log(71, shaderProgram, vertexShader, fragmentShader)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(`Unable to initialize the shader program : ${gl.getProgramInfoLog(shaderProgram)}`)
    return null
  }
  return shaderProgram
}


function loadShader(gl, type, source) {
  console.log(69, gl, type, source)
  // 创建一个新的着色器 
  const shader = gl.createShader(type)
  // 将源代码发送到着色器
  gl.shaderSource(shader, source)
  // gl 编译
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`An error occurred compiling the shaders :${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
    return null
  }

  console.log(75, shader)
  return shader
}
