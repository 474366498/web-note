
export const initShaders = (gl, vs, fs) => {
  // 创建程度对象
  const program = gl.createProgram()
  // 创建点、片着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs),
    fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs)
  // 把顶点着色对象装进程序对象
  gl.attachShader(program, vertexShader)
  // 把片元着色对象装进程序对象
  gl.attachShader(program, fragmentShader)
  // 连接webgl上下文对象和程序对象
  gl.linkProgram(program)
  // 启动程序对象
  gl.useProgram(program)
  // 挂载程序对象
  gl.program = program

}

export const loadShader = (g, type, source) => {
  // 根据type 创建着色对象
  const shader = g.createShader(type)
  // 将着色源文件传入着色对象
  g.shaderSource(source)
  // 编译着色对象
  g.compileShader(shader)
  // 返回着色对象
  return shader
}

