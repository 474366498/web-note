/**
 
 Placing points directly into clip space is of limited use.  What's better is
to take model data and transform it into clip space.  The cube is an easy example
of how to do this.  The cube data below consists of vertex positions, the colors
of the faces of the cube, and the order of the vertex positions that make up
the individual polygons (in groups of 3). The positions and colors are stored in
buffers and sent to the shader as attributes, and then operated upon individually.

Finally a single model matrix is set that represents the transformations that will
be performed on each position that makes up the model to move it into the correct
space.  In this case, for every frame of the animation, a series of scale, rotation,
and translation matrices move the data into the desired spot in clip space.  The
cube is the size of clip space (-1,-1,-1) to (1,1,1) so it will need to be shrunk
down to fit.  This matrix is sent to the shader having been multiplied in JavaScript
beforehand.

In the shader each position vertex is first transformed into a homogeneous
coordinate (vec4), and then multiplied against the model matrix.

gl_Position = model * vec4(position, 1.0);

It may be noted that in JavaScript matrix multiplication requires a function,
while in the shader it is built into the language with the simple * operator.

At this point the W value of the transformed point is still 1.0.  The cube still
doesn't have any perspective.  The next example will take this setup, and fiddle
with the W values to provide some perspective.

Exercise:

1) Shrink down the box using the scale matrix and position it in different places
within clip space.  Try moving it outside of clip space.  Resize the window
and watch as the box skews out of shape.  Add a rotateZ matrix.

2) Modify the MDN.createCubeData() function in /shared/cube.js to change the underlying
data for the cube and note how the model transform perserves it.  (Make sure and
restore it once you are done for the other examples.)
 
 
  将点直接放置到剪辑空间是有限的使用。更好的是获取模型数据并将其转换为剪辑空间。立方体是一个简单的例子如何做到这一点。下面的立方体数据由顶点位置和颜色组成立方体的面，以及组成的顶点位置的顺序单个多边形(每组3个)。位置和颜色存储在缓冲区和发送到着色器作为属性，然后单独操作。
  最后，设置一个模型矩阵，表示将进行的转换在组成模型的每个位置上执行，以将其移动到正确的位置空间。在这种情况下，对于动画的每一帧，一系列的缩放，旋转，平移矩阵将数据移动到剪辑空间中所需的位置。的Cube是剪辑空间(-1，-1，-1)到(1,1,1)的大小，所以它需要被收缩合身。这个矩阵被发送到在JavaScript中相乘的着色器事先。

在着色器中，每个位置顶点首先被转换为同质顶点坐标(vec4)，然后乘以模型矩阵。
gl_Position = model * vec4(position, 1.0);
可以注意到，在JavaScript中，矩阵乘法需要一个函数，而在着色器中，它是通过简单的*操作符内置到语言中的。

此时，变换点的W值仍为1.0。立方体仍然没有任何观点。下一个示例将采用这种设置并进行操作
使用W值提供一些透视图。

练习:

1)使用比例矩阵缩小盒子，并将其放置在不同的位置

在剪辑空间内。试着把它移到剪辑空间之外。调整窗口大小

看着盒子歪斜变形。添加一个rotateZ矩阵。

2)修改/shared/cube.js中的MDN.createCubeData()函数，改变底层

多维数据集的数据，并注意模型如何转换保存它。(确保

在完成其他示例后恢复它。)

 
 
 */


import { MDN } from '../../mdn/index'

console.log(4, MDN)

function CubeDemo() {
  // prep the canvas

  this.canvas = document.getElementById('canvas')
  this.canvas.width = window.innerWidth
  this.canvas.height = window.innerHeight

  // Grab a context 
  this.gl = MDN.createContext(canvas)


  this.transforms = {} // All of the matrix transforms 
  this.locations = {}  // All of the shader locations

  // MDN.createBuffersForCube and MDN.createCubeData are located in /cube.js
  this.buffers = MDN.createBuffersForCube(this.gl, MDN.createCubeData())
  this.webglProgram = this.setupProgram()

}

CubeDemo.prototype.setupProgram = function () {
  var gl = this.gl

  // Setup a WebGL program
  var webglProgram = MDN.createWebGLProgramFromIds(gl, 'vertex-shader', 'fragment-shader')
  gl.useProgram(webglProgram)

  // Save the attribute and uniform locations

  this.locations.model = gl.getUniformLocation(webglProgram, 'model')
  this.locations.positions = gl.getAttribLocation(webglProgram, 'position')
  this.locations.color = gl.getAttribLocation(webglProgram, 'color')

  console.log(107, gl, this.locations)
  gl.enable(gl.DEPTH_TEST)

  return webglProgram

}


// 计算模型矩阵
CubeDemo.prototype.computeModelMatrix = function (n) {
  // see matrices.js for the definitions of these matrix functions

  let scale = MDN.scaleMatrix(.5, .5, .5)
  let rotateX = MDN.rotateXMatrix(n * 0.0003),
    rotateY = MDN.rotateYMatrix(n * 0.0005),
    positions = MDN.translateMatrix(0, -0.1, 0)
  // Multiply together, make sure and read them in opposite order 乘在一起，确保按相反的顺序读
  // transforms
  this.transforms.model = MDN.multiplyArrayOfMatrices([
    positions,
    rotateY,
    rotateX,
    scale
  ])

}

// updateAttributesAndUniforms 更新属性和制服
CubeDemo.prototype.updateAttributesAndUniforms = function () {
  // console.log('updateAttributesAndUniforms')
  var gl = this.gl

  // Setup the color uniform that will be shared across all triangles

  gl.uniformMatrix4fv(this.locations.model, false, new Float32Array(this.transforms.model))
  // console.log(142, this.locations, this.buffers)
  // Set the positions attribute 
  gl.enableVertexAttribArray(this.locations.positions)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.positions)
  gl.vertexAttribPointer(this.locations.position, 3, gl.FLOAT, false, 0, 0)

  // set the colors attribute
  gl.enableVertexAttribArray(this.locations.color)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colors)
  gl.vertexAttribPointer(this.locations.color, 4, gl.FLOAT, false, 0, 0)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.elements)

}


CubeDemo.prototype.draw = function () {
  var gl = this.gl
  var now = Date.now()

  // Compute our matrices 
  this.computeModelMatrix(now)

  // Update the data going to the GPU
  this.updateAttributesAndUniforms()
  // console.log(167, gl, gl.drawElements)
  // Perform the actual draw 
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  // gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
  // debugger
  requestAnimationFrame(this.draw.bind(this))

}

var cube = new CubeDemo()
cube.draw()

