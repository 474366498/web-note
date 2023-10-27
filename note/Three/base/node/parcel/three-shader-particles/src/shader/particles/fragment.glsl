

varying vec2 vUv;

uniform sampler2D uTexture_5 ;
uniform sampler2D uTexture_8 ;
uniform sampler2D uTexture_9 ;

varying float vImgIndex ;
varying vec3 vColor ;

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

  /*
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
  */

  vec4 textureColor ;
  if(vImgIndex == 0.0) {
    textureColor = texture2D(uTexture_5,gl_PointCoord) ;
  } else if(vImgIndex == 1.0) {
    textureColor = texture2D(uTexture_8,gl_PointCoord) ;
  }else {
    textureColor = texture2D(uTexture_9,gl_PointCoord) ;
  }
  gl_FragColor = vec4(textureColor.rgb,textureColor.r) ;

  // gl_FragColor = vec4(vColor,textureColor.r) ;


}