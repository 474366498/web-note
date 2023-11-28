

attribute vec3 aPosition ;
uniform float uTime ; 


void main () {
  // gl_Position =   projectionMatrix *  viewMatrix *  modelMatrix * vec4(position,1.0) ;
  vec4 currentPosition = modelMatrix * vec4(position,1.0) ;
  vec3 direction = aPosition - currentPosition.xyz ;

  vec3 targetPosition = currentPosition.xyz + direction * .1 * uTime ;
  vec4 vPosition = viewMatrix * vec4(targetPosition , 1.0) ;
  gl_Position = projectionMatrix * vPosition ;
  gl_PointSize = .2 ; 

}