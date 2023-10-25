precision lowp float ; 

varying vec4 vPosition ;
varying vec4 gPosition ; 

void main () {

  vec4 redColor = vec4(1.0, 0.0, 0.0 , 1.0) ;
  vec4 yellowColor = vec4(1.0 , 1.0 , 0.0 ,1.0) ;
  vec4 mixColor = mix(yellowColor , redColor , gPosition / 3.0 ) ;

  if(gl_FrontFacing) {
    gl_FragColor = vec4(mixColor.xyz - (vPosition.y - 50.0 ) / 50.0 - .1 , 1.0) ;
  }else{
    gl_FragColor = vec4(mixColor.xyz,1.0) ;
  }

}