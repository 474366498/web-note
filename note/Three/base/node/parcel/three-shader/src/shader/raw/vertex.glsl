
precision lowp float;

attribute vec3 position ;
attribute vec2 uv;


uniform mat4 projectionMatrix ;
uniform mat4 viewMatrix ;
uniform mat4 modelMatrix ;
uniform float uTime ;


varying vec2 uUv;

varying float high ;

void main () {
  uUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position,1.0) ;
  // modelPosition.x += 0.5 ;
  // modelPosition.z += 0.5 ;

  // modelPosition.z += modelPosition.x;
  // modelPosition.y += 1.5 ;

  modelPosition.z = sin(modelPosition.x * 10.0 ) * 0.125 ;  
  modelPosition.z += sin(modelPosition.y * 10.0 ) * 0.125 ;  

  high = modelPosition.z ;

  gl_Position = projectionMatrix *  viewMatrix *  modelPosition ;
}


