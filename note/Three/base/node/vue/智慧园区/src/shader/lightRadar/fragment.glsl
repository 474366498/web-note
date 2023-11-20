
// varying float vSize ;

uniform float uTime ;
uniform vec3 uColor ;

varying vec2 vUv ;

mat2 rotate2d (float _angle) {
    return mat2(cos(_angle) , -sin(_angle) , sin(_angle) , cos(_angle));
}

void main () {
    vec2 nUv = rotate2d(uTime * 6.28 ) * (vUv - vec2(.5) ) ;
    nUv += vec2(.5) ;
    float alpha = 1.0 - step(.5 , distance(nUv , vec2(.5))) ;
    
    float angle = atan(nUv.x - .5 , nUv.y - .5) ;

    float strength = (angle + 3.14) / 6.28 ;
    
    alpha = alpha * strength ;

    // alpha = alpha * strength - .5 ;
    // alpha *= 2.0 ; 

    gl_FragColor = vec4(uColor,alpha  ) ;
}

/*
void main () {
    vec2 nUv = rotate2d(uTime * 6.28) * (vUv - .5) ;
    
    nUv += .5 ; 

    float alpha = 1.0 - step(.5, distance(nUv , vec2(.5) ) ) ;

    float angle = atan(nUv.x - .5 , nUv.y - .5) ;

    float strength = (angle + 3.14) / 6.28 ;

    gl_FragColor = vec4(uColor,angle * strength );

}
*/