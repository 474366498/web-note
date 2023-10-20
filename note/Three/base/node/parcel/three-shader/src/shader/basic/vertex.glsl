

void main () {

  // gl_Position = modelMatrix * projectionMatrix * viewMatrix *  vec4(position,1.0) ;
  gl_Position =   projectionMatrix *  viewMatrix *  modelMatrix * vec4(position,1.0) ;
}