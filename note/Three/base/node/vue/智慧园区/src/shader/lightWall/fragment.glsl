
// varying float vSize ;

uniform float uHeight ;
uniform vec3 uColor ;

varying vec3 vPosition ;

void main () {
    float gradMix = 1.6 - (vPosition.y + uHeight) / uHeight  ;
    gl_FragColor = vec4(uColor,gradMix);

}