
export const initBuffers = (gl) => {
  // debugger
  console.log(3, gl)
  const positionBuffer = initPositionBuffer(gl)

  return {
    position: positionBuffer
  }
}

export const initPositionBuffer = gl => {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return positionBuffer
}

