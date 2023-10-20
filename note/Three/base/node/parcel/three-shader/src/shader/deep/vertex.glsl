
precision lowp float;

attribute vec3 position ;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix ;


varying vec2 uUv;


void main () {
  uUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position,1.0) ;

  gl_Position = projectionMatrix *  viewMatrix *  modelPosition ;
}


