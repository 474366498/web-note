
## webGL 上下文
  ### attributes 

  #### canvas [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/canvas)
  #### drawingBufferColorSpace [mdn](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferColorSpace)
  ***value*** 
  > srgb [sRGB color space](https://en.wikipedia.org/wiki/SRGB)
  > display-p3 [display-p3 color space](https://en.wikipedia.org/wiki/DCI-P3)

  #### drawingBufferHeight 

  #### drawingBufferWidth
  #### unpackColorSpace [mdn](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/unpackColorSpace) 同 drawingBufferColorSpace



  ### methods 
  #### activeTexture 加载纹理 gl [TEXTURE ]
  > gl.activeTexture(gl.TEXTURE)
  
  #### attachShader 
  > WebGL API的WebGLRenderingContext.attachShader()方法将片段或顶点WebGLShader附加到WebGLProgram。
  ```javascript 
  const program = gl.createProgram() 

  // Attach pre-existing shaders 
  gl.attachShader(program,vertexShader) 
  gl.attachShader(program,fragmentShader) 

  gl.linkProgram(program) 
  
  ```
  #### bindAttribLocation  
  >WebGL API的WebGLRenderingContext.bindAttribLocation()方法将一个通用的顶点索引绑定到一个属性变量。
  ``` gl.bindAttribLocation(program,colorLocation,'vColor') ```

  #### bindBuffer 
  > WebGL API的WebGLRenderingContext.bindBuffer()方法将一个给定的WebGLBuffer绑定到一个目标。
  ```javascript
  const canvas = document.getElementById('canvas') 
  const gl = canvas.getContext('webgl')
  const buffer = gl.createBuffer() 

  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)

  // get bindings 
  gl.getParameter(gl.ARRAY_BUFFER_BINDING) 
  gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING)
  
  ```

  #### bindFramebuffer  
  >WebGL API的WebGLRenderingContext.bindFramebuffer()方法将提供的WebGLFramebuffer绑定到指定的目标，或者，如果framebuffer参数为空，则绑定到默认的WebGLFramebuffer，它与画布呈现上下文相关联。
  ```javascript 
  const canvas = document.getElementById('canvas') 
  const gl = canvas.getContext('webgl')
  const framebuffer = gl.createFramebuffer() 
  gl.bindFramebuffer(gl.FRAMEBUFFER,framebuffer) // target => gl.FRAMEBUFFER / gl.DRAW_FRAMEBUFFER / gl.READ_FRAMEBUFFER 
  
  // get binding 
  gl.getParameter(gl.FRAMEBUFFER_BINDING) 
  ```

  #### bindRenderbuffer  
  >WebGL API的WebGLRenderingContext.bindRenderbuffer()方法将给定的WebGLRenderbuffer绑定到一个目标，该目标必须是gl.RENDERBUFFER。
  ```javascript 
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  const renderbuffer = gl.createRenderbuffer()

  gl.bindRenderbuffer(gl.RENDERBUFFER,renderbuffer)

  // get bindding 
  gl.getParameter(gl.RENDERBUFFER_BINDING) 
  
  ```

  #### bindTexture  
  >WebGL API的WebGLRenderingContext.bindTexture()方法将一个给定的WebGLTexture绑定到一个目标(绑定点)。
  ```javascript 
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D,texture) // target => gl.TEXTURE-2D / gl.TEXTURE_3D / gl.TEXTURE_2D_ARRAY 

  //get 
  gl.getParameter(gl.TEXTURE_BINDING_2D)
  
  ```
  #### blendColor  
  >WebGL API的WebGLRenderingContext.blendColor()方法用于设置源和目标混合因子
  ```javascript 
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  gl.blendColor(0,.5,1,1) // r,g,b,a => 0~1 

  // get color 
  gl.getParameter(gl.BLEND_COLOR)
  
  ```
  #### blendEquation [MDN blendEquation](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendEquation)
  >WebGL API的WebGLRenderingContext.blendEquation()方法用于将RGB混合方程和alpha混合方程设置为单个方程。
  >混合方程决定了一个新的像素如何与WebGLFramebuffer中已经存在的像素相结合。
  ```javascript 
  gl.blendEquation(gl.FUNC_ADD) // mode => gl.FUNC_ADD / gl.FUNC_SUBTRACT / gl.FUNC_REVERSE_SUBTRACT 
  
  // get 

  gl.getParameter(gl.BLEND_EQUATION) // => params gl.BLEND_EQUATION / gl.BLEND_EQUATION_RGB / gl.BLEND_EQUATION_ALPHA
  // 要获得混合方程，查询BLEND_EQUATION, BLEND_EQUATION_RGB和BLEND_EQUATION_ALPHA常量，它们返回gl.FUNC_ADD, gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT，或者如果EXT_blend_minmax已启用:ext.MIN_EXT或ext.MAX_EXT。
  
  ```

  #### blendEquationSeparate 
  >WebGL API的WebGLRenderingContext.blendEquationSeparate()方法用于分别设置RGB混合方程和alpha混合方程。
  >混合方程决定了一个新的像素如何与WebGLFramebuffer中已经存在的像素相结合。
  ```javascript 
  gl.blendEquationSeparate(modeRgb,modeAlpha) // mode => gl.FUNC_ADD / gl.FUNC_SUBTRACT / gl.FUNC_REVERSE_SUBTRACT 
  // get 
  gl.getParameter(query) // query => gl.BLEND_EQUATION / gl.BLEND_EQUATION_RGB / gl.BLEND_EQUATION_ALPHA 
  // 要获得混合方程，查询BLEND_EQUATION, BLEND_EQUATION_RGB和BLEND_EQUATION_ALPHA常量，它们返回gl.FUNC_ADD, gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT，或者如果EXT_blend_minmax已启用:ext.MIN_EXT或ext.MAX_EXT。

  ```
  #### blendFunc 
  >WebGL API的WebGLRenderingContext.blendFunc()方法定义了用于混合像素算法的函数
  > factor [!更多参数](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc)
  ```javascript 
  gl.enable(gl.BLEND)
  gl.blendFunc(sfactor ,dfactor) // factor => gl.SRC_COLOR,gl.DST_COLOR 

  // get 
  gl.getParameter(gl.BLEND_SRC_RGB) // query => gl.BLEND_SRC_RGB / gl.BLEND_SRC_ALPHA / gl.BLEND_DST_RGB / gl.BLEND_DST_ALPHA 
  
  ```

  #### blendFuncSeparate 
  >WebGL API的WebGLRenderingContext.blendFuncSeparate()方法定义了分别使用哪个函数来混合RGB和alpha组件的像素算法。
  >parameters [!更多](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFuncSeparate)
  ```javascript 
  gl.enable(gl.BLEND)
  gl.blendFuncSeparate(gl.SRC_COLOR,gl.DST_COLOR,gl.ONE,gl.ZERO) // parameters => WebGL_API.TYPES

  // get 
  gl.getParameter(gl.BLEND_SRC_RGB)
  
  ```

  #### bufferData 
  >WebGL API的WebGLRenderingContext.bufferData()方法初始化并创建缓冲区对象的数据存储。
  ***WebGL1*** 
  >bufferData(target,usage)
  >bufferData(target,size,usage)
  >bufferData(target,srcData,usage)
  ***WebGL2***
  >bufferData(target,usage,srcOffset)
  >bufferData(target,srcData,usage,srcOffset)
  >bufferData(target,srcData,usage,srcOffset,length)
 
  |   params  |                                   value                     |
  |   ----    |                                   ----                      |
  | target    |   gl.ARRAY_BUFFER gl.ELEMENT_ARRAY_BUFFER gl.COPY_READ_BUFFER gl.COPY_WRITE_BUFFER gl.TRANSFORM_FEEDBACK_BUFFER gl.UNIFORM_BUFFER gl.PIXEL_PACK_BUFFER gl.PIXEL_UNPACK_BUFFER |   
  | size      |     [!GLsizeiptr](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)                                                        |   
  | srcData   | ArrayBuffer , ShareArrayBuffer , TypedArray , DataView     |   
  | usage     | gl.STATIC_DRAW gl.DYNAMIC_DRAW gl.STREAM_DRAW gl.STATIC_READ  gl.DYNAMIC_READ gl.STREAM_READ gl.STATIC_COPY gl.DYNAMIC_COPY gl.STREAM_COPY                                |   
  | srcOffset |     [!GLuint](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)            |    
  | length    |     [!GLuint](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)      |    

  ```javascript 
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
  gl.bufferData(gl.ARRAY_BUFFER,1024,gl.STATIC_DRAW)

  // GET 
  gl.getBufferParameter(gl.ARRAY_BUFFER,gl.BUFFER_SIZE) 
  gl.getBufferParameter(gl.ARRAY_BUFFER,gl.BUFFER_USAGE)
  
  ```

  #### bufferSubData 
  >WebGL API的WebGLRenderingContext.bufferSubData()方法更新缓冲区对象数据存储的子集。

  ***WebGL1*** 
  >bufferSubData(target,offset)
  >bufferSubData(target,offset,srcData)
  ***WebGL2***
  >bufferSubData(target,dstByteOffset,srcOffset)
  >bufferSubData(target,dstByteOffset,srcData,srcOffset)
  >bufferSubData(target,dstByteOffset,srcData,srcOffset,length)

  |   params       |                                   value                     |
  |   ----         |                                   ----                      |
  | target         |   gl.ARRAY_BUFFER gl.ELEMENT_ARRAY_BUFFER gl.COPY_READ_BUFFER gl.COPY_WRITE_BUFFER gl.TRANSFORM_FEEDBACK_BUFFER gl.UNIFORM_BUFFER gl.PIXEL_PACK_BUFFER gl.PIXEL_UNPACK_BUFFER |   
  | dstByteOffset  |     [!GLintptr](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)                                                        |   
  | srcData   | ArrayBuffer , ShareArrayBuffer , TypedArray , DataView   |                                    
  | srcOffset |     [!GLuint](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)            |    
  | length    |     [!GLuint](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Types)      | 

  ```javascript 
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
  gl.bufferData(gl.ARRAY_BUFFER,1024,gl.STATIC_DRAW)
  gl.bufferSubData(gl.ARRAY_BUFFER,512,data)
  
  ```

  #### checkFramebufferStatus
  >WebGL API的WebGLRenderingContext.checkFramebufferStatus()方法返回WebGLFramebuffer对象的完整状态。
  
  ```javascript
  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  const framebuffer = gl.createFramebuffer()

  // ....

  gl.checkFramebufferStatus(query) // query => gl.FRAMEBUFFER gl.DRAW_FRAMEBUFFER gl.READ_FRAMEBUFFER 

  ```

  #### clear 
  >WebGL API的WebGLRenderingContext.clear()方法将缓冲区清除为预设值。
  ```javascript 
  gl.clear(mask) // mask => gl.COLOR_BUFFER_BIT gl.DEPTH_BUFFER_BIT gl.STENCIL_BUFFER_BIT

  // 要获取当前的清除值 可使用以下：
  gl.getParameter(gl.COLOR_CLEAR_VALUE)
  gl.getParameter(gl.DEPTH_CLEAR_VALUE)
  gl.getParameter(gl.STENCIL_CLEAR_VALUE)
  
  ```

  #### clearColor 
  >WebGL API的WebGLRenderingContext.clearColor()方法指定清除颜色缓冲区时使用的颜色值
  ```javascript 
  gl.clearColor(r,g,b,a) // r g b a => 0-1
  
  // 获取当前的值
  gl.getParameter(gl.COLOR_CLEAR_VALUE) // 返回 => Float32Array [r,g,b,a] r g b a => 0-1
   
  ```

  #### clearDepth 
  >WebGL API的WebGLRenderingContext.clearDepth()方法指定深度缓冲区的clear值。
  ```javascript 
  gl.clearDepth(z) // z => 0-1
  // 获取depth 值
  gl.getParameter(gl.DEPTH_CLEAR_VALUE) // 返回 => 0-1数字
  ```


  #### clearStencil 
  >WebGL API的WebGLRenderingContext.clearStencil()方法指定了模板缓冲区的clear值。
  ```javascript
  gl.clearStencil(1)  

  // 获取
  gl.getParameter(gl.STENCIL_CLEAR_VALUE)

  ```
  #### colorMask
  >WebGL API的WebGLRenderingContext.colorMask()方法设置了当绘制或渲染到WebGLFramebuffer时启用或禁用哪些颜色组件。

  

  #### compileShader 

  #### compressedTexImage[23]D 

  #### compressedTexSubImage2D 