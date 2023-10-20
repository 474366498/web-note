
precision lowp float;
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

varying vec2 uUv ; 
varying float high ;


void main () {
  // gl_FragColor = vec4(uUv,0.0,0.95) ;
  float colorR = high + 0.125 * 1.0 ;

  gl_FragColor = vec4(colorR , 0.0,0.0,1.0) ;
}