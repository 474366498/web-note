
precision lowp float;
// highp  -2^16 - 2^16
// mediump -2^10 - 2^10
// lowp -2^8 - 2^8

uniform float uTime ;
uniform float uScale ;



varying vec2 uUv ; 

#define PI 3.1415926535


// 随机函数
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 truchetPattern(in vec2 _st, in float _index){
    _index = fract(((_index-0.5)*2.0));
    if (_index > 0.75) {
        _st = vec2(1.0) - _st;
    } else if (_index > 0.5) {
        _st = vec2(1.0-_st.x,_st.y);
    } else if (_index > 0.25) {
        _st = 1.0-vec2(1.0-_st.x,_st.y);
    }
    return _st;
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

// 噪声函数
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main () {

  // 1通过顶点对应的uv，决定每一个像素在uv图像的位置，通过这个位置x,y决定颜色
  // gl_FragColor = vec4(uUv,0.0,0.95) ;

  // 2 对第一种进行变形
  // gl_FragColor = vec4(uUv,1,1) ;

  // 3利用uv实现从左到右的渐变
  // float strength = uUv.x ;
  // gl_FragColor = vec4(strength,strength,strength,0.1) ;

  // 4 利用uv实现从下到上的渐变
  // float strength = uUv.y ;
  // gl_FragColor = vec4(strength,strength,strength,1) ;

  // 5 uv实现从上到下的渐变
  // float strength = 1.0 - uUv.y ;
  // gl_FragColor = vec4(strength,strength,strength,1.0-strength) ;

  // 6 uv实现短范围内的渐变 
  // float strength = uUv.x * 10.0 ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 7 能打过取模达到反复效果
  // float strength = mod(uUv.y * 10.0 , 1.0) ; 
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 8 利用step(edge, x)如果x < edge，返回0.0，否则返回1.0
  // float strength = mod(uUv.y * 10.0 , 1.0) ;
  // strength = step(0.5,strength) ;
  // float alpha = step(0.1,strength) ;
  // gl_FragColor = vec4(strength,strength,strength,alpha) ;

  // 9 利用step(edge, x)如果x < edge，返回0.0，否则返回1.0 
  // float strength = mod(uUv.x * 10.0 , 1.0) ;
  // strength = step(0.3,strength) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 10 利用step(edge, x)如果x < edge，返回0.0，否则返回1.0 
  // float strength = mod(uUv.x * 4.0 , 1.0) ;
  // strength = step(0.5,strength) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 11 条纹相加
  // float strength = step(0.7,mod(uUv.x * 10.0 , 1.0)) ;
  // strength += step(0.7,mod(uUv.y * 10.0, 1.0)) ;
  // gl_FragColor = vec4(strength,strength,strength,1) ;

  // 12 条纹相交
  // float strength = step(0.7,mod(uUv.x * 10.0,1.0)) ;
  // strength *= step(0.7,mod(uUv.y * 10.0,1.0)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 13 条纹相减
  // float strength = step(0.7,mod(uUv.x * 10.0,1.0)) ;
  // strength -= step(0.7,mod(uUv.y * 10.0,1.0));
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 14 方块图形
  // float strength = step(0.3,mod(uUv.x * 10.0,1.0)) ;
  // strength *= step(0.3,mod(uUv.y * 10.0 , 1.0)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;
  
  // 15 T型图
  // float barX = step(0.2,mod(uUv.x * 5.0 - 0.25 , 1.0)) * step(0.8,mod(uUv.y * 5.0 -0.1,1.0)) ;
  // float barY = step(0.2,mod(uUv.y * 5.0 -0.1, 1.0)) * step(0.8 , mod(uUv.x * 5.0 ,1.0)) ;
  // float strength = barX + barY ;
  // gl_FragColor = vec4(strength,strength,strength,1) ;

  // 16 通过绝对值
  // float strength = abs(uUv.x - 0.5) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 17 取2个值的最小值
  // float strength = min(abs(uUv.x - 0.5) , abs(uUv.y - 0.5)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 18 取2个值的最大值
  // float strength = max(abs(uUv.x - 0.5) , abs(uUv.y - 0.5)) ;
  // gl_FragColor = vec4(strength,strength,strength,0.10) ;

  // 19 step 
  // float strength = step(0.15 , max(abs(uUv.x - 0.5) , abs(uUv.y - 0.5))) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0);

  // 20 小正文形
  // float strength = 1.0 - step(0.25 , max(abs(uUv.x - 0.5)  , abs(uUv.y - 0.5)) ) ;
  //                                            0 ~ 0.5             0-0.5
  //                                    0 ~ 0.5 
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 21 利用取整实现条纹渐变
  // float strength = floor(uUv.x * 10.0) / 10.0 ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 22 条纹相乘 实现渐变格子 
  // float strength = floor(uUv.x * 10.0) / 10.0 ;
  // strength *= floor(uUv.y * 10.0 ) / 10.0 ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 23 向上取整
  // float strength = ceil(uUv.x * 10.0) / 10.0 ; 
  // strength = strength / ceil(uUv.y * 10.0) * 10.0 ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 24 随机效果 
  // float strength = random(uUv) ;
  // vec2 tile = truchetPattern(fract(uUv), random( uUv ));
  // gl_FragColor = vec4(vec2(tile),strength,1.0) ;


  // 24 随机 格子效果 
  // float strength = ceil(uUv.x * 5.0) / 5.0 * ceil(uUv.y * 5.0) / 5.0 ;
  // strength = random(vec2(strength)) ;
  // gl_FragColor = vec4(1.0,strength,strength,1.0) ;

  // 25 依据length返回向量长度
  // float strength = 1.0 - length(uUv) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 26 根据distance 2个向量的距离
  // float strength = 1.0 - distance(uUv , vec2(0.5,0.5));
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 27根据相除 实现星星
  // float strength = 0.15 / distance(uUv , vec2(0.5,0.5)) - 0.25;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 28 设置uUv水平或者竖直变量
  // float strength = 0.15 / distance( vec2(uUv.x , (uUv.y - 0.4 ) * 5.0 ) , vec2(0.5,0.5) ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // float strength = 0.15 / distance( vec2(uUv.y , (uUv.x - 0.4) * 5.0 ), vec2(0.5,0.5) ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 29 十字交叉的星星
  // float strength = 0.15 / distance( vec2(uUv.x, (uUv.y - 0.4) * 5.0  ) , vec2(0.5,0.5) ) ;
  // strength += 0.15 / distance( vec2(uUv.y , (uUv.x - 0.4 ) * 5.0 ) , vec2(0.5,0.5) ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ; 

  // 30 旋转飞镖 
  // vec2 rotateUv = rotate(uUv,uTime * 2.0 , vec2(0.5) ) ;
  // float strength = 0.15 / distance(vec2(rotateUv.x,(rotateUv.y - 0.5) * 5.0 + 0.5 ) , vec2(0.5,0.5)) ;
  // strength += 0.15 / distance( vec2(rotateUv.y, (rotateUv.x - 0.5 ) * 5.0 + 0.5 ) ,vec2(0.5,0.5)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0);

  // 31 鬼子膏药旗
  // float strength = step(.5 , distance(uUv , vec2(0.5)) + .25);
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 32 绘制圆
  // float strength = 1.0 - step(.5 , distance(uUv,vec2(.5)) + .24 ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0);

  // 33 圆环 
  // float strength = step(.5,distance(uUv,vec2(.5)) + .45) ;
  // strength *= (1.0 - step(.5 , distance(uUv , vec2(.5)) + .4) ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 34 渐变环
  // float strength = abs(distance(uUv , vec2(.5)) - .45) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ; 

  // 35 打靶 
  // float strength = step(.1,abs(distance(uUv , vec2(.5)) - .2));
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 36 圆环
  // float strength = 1.0 - step(.1,abs(distance(uUv , vec2(.5)) - .25));
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 37 波浪环
  // vec2 waveUv = vec2( uUv.x , uUv.y + sin(uUv.x * 10.0) * .1  ) ;
  // float strength = 1.0 - step(.1 , abs(distance(waveUv, vec2(.5)) - .2 ));
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 38 
  // vec2 waveUv = vec2(uUv.x + sin(uUv.y * 200.0) * .1 , uUv.y + sin(uUv.x * 200.0) * .1) ;
  // float strength = 1.0 - step(0.01 , abs(distance(waveUv , vec2(.5))  - .35)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 39 
  // vec2 waveUv = vec2(uUv.x + sin(uUv.y * 100.0) * sin(uTime) , uUv.y + sin(uUv.x * 100.0) * sin(uTime) ) ;
  // float strength = 1.0 - step(.01 , abs(distance(waveUv , vec2(.5)) - .25 )) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 40 根据角度显示视图
  // float angle = atan(uUv.x , uUv.y) ;
  // float strength = angle ;
  // gl_FragColor = vec4(strength,strength,strength , 1.0) ;

  // 41 根据角度实现螺旋渐变 
  // float angle = atan(uUv.x - .5 , uUv.y - .5 ) ;
  // float strength = (angle + PI) / 2.0 / PI + fract(uTime / 1000.0) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0);

  // 42 实现雷达扫射 
  // float alpha = 1.0 - step(.4 , distance(uUv , vec2(.5))) ;
  // float angle = atan(uUv.x - .5 , uUv.y - .5) ;
  // float strength = (angle + PI) / 2.0 / PI ;
  // gl_FragColor = vec4(strength,strength,strength,alpha) ;

  // 43 通过时间实现动态选择 
  // vec2 rotateUv = rotate(vUv,3.14*0.25,vec2(0.5));
  // vec2 rotateUv = rotate(uUv, uTime * 5.0 , vec2(.5)) ;
  // float alpha =  step(.5, distance(uUv , vec2(.5))) ;
  // float angle = atan(rotateUv.x - .5 , rotateUv.x - .5) ;
  // float strength = (angle + PI ) / 2.0 / PI ;
  // gl_FragColor = vec4(strength,strength,strength,alpha) ;

  // 44 万花筒
  // float angle = atan(uUv.x - .5 , uUv.y - .5) / PI ;
  // float strength = mod(angle * 20.0 , 1.0) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 45 光芒四射
  // float angle = atan(uUv.x - .5 , uUv.y - .5)  / PI ;
  // float strength = sin(angle * 100.0) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 46 使用噪声实现烟雾波纹效果
  // float strength = noise(uUv) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // float strength = noise(uUv * 10.0) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // float strength = step(.5,noise(uUv * 20.0)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 47 通过时间设置波形
  // float strength = step(uScale , cnoise(uUv * 10.0 + uTime)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // float strength = abs(cnoise(uUv * 10.0 + uTime ) )  ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 48 发光路径
  // float strength = 1.0 - abs(cnoise(uUv * 10.0 )) ;
  // float strength = 1.0 - abs(cnoise(uUv * 10.0 + uTime)) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 49 波纹效果
  // float strength = sin(cnoise(uUv * 10.0) * 5.0 + uTime) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;
  // float strength = step(.1,sin(cnoise(uUv * 10.0 + uTime) * 20.0)  ) ;
  // gl_FragColor = vec4(strength,strength,strength,1.0) ;

  // 50 使用混合函数混色
  vec3 purpleColor = vec3(1.0 , 0.0 , 1.0) ;
  vec3 greenColor = vec3(1.0, 1.0 , 1.0) ;
  vec3 uvColor = vec3(uUv , 1.0) ;
  float strength = step(.9, sin(cnoise(uUv * 10.0 + uTime) * 20.0)) ;
  vec3 mixColor = mix(greenColor , uvColor , strength) ;

  gl_FragColor = vec4(mixColor , 1.0) ;
















}