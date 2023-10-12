/**
 * Utility functions for:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLProgram
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLShader
 * 
 **/

export function createShader(gl, source, type) {

  // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER

  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

    var info = gl.getShaderInfoLog(shader);
    throw "Could not compile WebGL program. \n\n" + info;
  }

  return shader
}

export function linkProgram(gl, vertexShader, fragmentShader) {

  var program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var info = gl.getProgramInfoLog(program);
    throw "Could not compile WebGL program. \n\n" + info;
  }

  return program;
}

export function createWebGLProgram(gl, vertexSource, fragmentSource) {

  // Combines createShader() and linkProgram()

  var vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
  var fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  return linkProgram(gl, vertexShader, fragmentShader);
}

export function createWebGLProgramFromIds(gl, vertexSourceId, fragmentSourceId) {

  var vertexSourceEl = document.getElementById(vertexSourceId);
  var fragmentSourceEl = document.getElementById(fragmentSourceId);

  return createWebGLProgram(
    gl,
    vertexSourceEl.innerHTML,
    fragmentSourceEl.innerHTML
  );
}

export function createContext(canvas) {
  var gl

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  } catch (e) { }

  if (!gl) {
    console.error(`Unable to initialize WebGL. Your browser may not support it.`)
    gl = null
  }
  return gl
}