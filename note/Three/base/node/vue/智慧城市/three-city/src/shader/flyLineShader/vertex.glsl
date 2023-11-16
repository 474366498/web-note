

attribute float aSize ;

uniform float uTime ;
uniform float  uLength ; 

varying float vSize ;

void main(){

  vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1);
  gl_Position = projectionMatrix * viewPosition;
  vSize = aSize - uTime ;
  // vSize = vSize / 2.0 ;
  // vSize = vSize * 2.0 ;
  if(vSize < 0.0) {
    vSize = vSize + uLength ;
  } 
  vSize = (vSize - 1500.0) * 0.04 ;
  gl_PointSize = vSize  ;

}