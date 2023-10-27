

varying vec2 vUv;

uniform sampler2D uTexture ;

void main () {
  
  // gl_FragColor = vec4(gl_PointCoord , .01 , 1.0) ;

  // 设置渐变圆 
  // float strength = distance(gl_PointCoord , vec2(.5)) ;
  // strength *= 2.0  ;
  // strength = 1.0 - strength ;
  // gl_FragColor = vec4(1.0,strength,strength,strength) ;

  // 圆形点 
  // float strength = 1.0 - distance(gl_PointCoord , vec2(.5) ) ;
  // strength = step(.5,strength) ;
  // gl_FragColor = vec4(strength) ;

  // vec4 textureColor = texture2D(uTexture,vec2(.01)) ;
  // vec4 textureColor = texture2D(uTexture,vec2(gl_PointCoord)) ;  // vec4 => rgba 4个参数
  // gl_FragColor = vec4(textureColor.gba, textureColor.a) ;

  float dist = distance(gl_PointCoord , vec2(.5)) ;
  mat4 m = mat4x4(
    255.0,0.0,0.0,255.0,
    255.0,255.0,0.0,255.0,
    0.0,255.0,0.0,255.0,
    0.0,0.0,255.0,255.0  
  ) ;
  if(dist >= 0.0 && dist < .125 ) {
    gl_FragColor = m[0] / 255.0 ;
  }else if(dist >= .125 && dist < .25) {
    gl_FragColor = m[1] / 255.0 ;
  }else if(dist >= .25 && dist < .375) {
    gl_FragColor = m[2] / 255.0 ;
  }else if(dist >= .375 && dist < .5) {
    gl_FragColor = m[3] / 255.0 ;
  }else {
    discard ;
  }


}