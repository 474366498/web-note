
varying float vSize ;

uniform vec3 uColor ;

void main () {
  float dis = distance(gl_PointCoord , vec2(.5) ) ;
  float strength = 1.0 - (dis * 2.0 ) ;
  if(vSize <= 0.0) {
    gl_FragColor = vec4(uColor,0.0);
  }else{
    gl_FragColor = vec4(uColor,strength);
  }

}