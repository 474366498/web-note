
console.log(222, mat4 || 'mat4')
export const drawScene = (gl, programInfo, buffers) => {
  console.log(gl, mat4)
  gl.clearColor(1.0, 0.0, 0.0, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  // debugger
  const fieldOfView = 45 * Math.PI / 180,
    aspect = gl.canvas.clientWidth / gl.canvas.clientHeight,
    zNear = .1,
    zFar = 100.0,
    projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

  const modelViewMatrix = mat4.create()

  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [-0.0, 0.0, -4.0]
  )

  setPositionAttribute(gl, buffers, programInfo)
  gl.useProgram(programInfo.program)

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

  {
    const offset = 0, vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }

}

export const setPositionAttribute = (gl, buffers, programInfo) => {
  const numComponents = 2,
    type = gl.FLOAT,
    normalize = false,
    stride = 0,
    offset = 0

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  )
  console.log('draw', gl)
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

}