

import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import TWEEN from 'three/examples/jsm/libs/tween.module.min'

console.log(9, GUI, TWEEN)

var stats, webgl, camera, transition, gui

const transitionParams = {
  useTexture: true,
  transition: 0,
  texture: 5,
  cycle: true,
  animate: true,
  threshold: .4
}

const clock = new T.Clock()

init()
animate()

function init() {

  initGui()

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  const geometryA = new T.BoxGeometry(2, 4, 2)
  const geometryB = new T.IcosahedronGeometry(1, 1)

  const sceneA = new FXScene(geometryA, new T.Vector3(0, -.4, 0), 0xffffff, 'sceneA')
  const sceneB = new FXScene(geometryB, new T.Vector3(0, .2, .1), 0x000000, 'sceneB')
  console.log(42, sceneA, sceneB)

  transition = new Transition(sceneA, sceneB)

}

function animate() {
  requestAnimationFrame(animate)
  // webgl.render(scene, camera)
  transition.render(clock.getDelta())
  stats.update()
}


function initGui() {
  gui = new GUI()
  gui.add(transitionParams, 'animate')
  gui.add(transitionParams, 'transition', 0, 1, .01).listen()
  gui.add(transitionParams, 'useTexture').onChange(val => transition.useTexture(val))
  gui.add(transitionParams, 'texture', { Perlin: 0, Squares: 1, Cells: 2, Distort: 3, Gradient: 4, Radial: 5 }).onChange(val => transition.setTexture(val)).listen()
  gui.add(transitionParams, 'cycle')
  gui.add(transitionParams, 'threshold', 0, 1, .01).onChange(val => transition.setTextureThreshold(val))

}

function generateInstancedMesh(geo, material, count) {
  const mesh = new T.InstancedMesh(geo, material, count),
    dummy = new T.Object3D(),
    color = new T.Color()

  for (let i = 0; i < count; i++) {
    dummy.position.x = Math.random() * 10000 - 5000;
    dummy.position.y = Math.random() * 6000 - 3000;
    dummy.position.z = Math.random() * 8000 - 4000;

    dummy.rotation.x = Math.random() * 2 * Math.PI;
    dummy.rotation.y = Math.random() * 2 * Math.PI;
    dummy.rotation.z = Math.random() * 2 * Math.PI;

    dummy.scale.x = Math.random() * 200 + 100;

    if (geo.type === 'BoxGeometry') {

      dummy.scale.y = Math.random() * 200 + 100;
      dummy.scale.z = Math.random() * 200 + 100;

    } else {

      dummy.scale.y = dummy.scale.x;
      dummy.scale.z = dummy.scale.x;

    }

    dummy.updateMatrix();

    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, color.setScalar(0.1 + 0.9 * Math.random()));
  }
  return mesh
}

function FXScene(geo, speed, clearColor, name) {
  this.name = name
  this.geo = geo
  this.clearColor = clearColor
  camera = new T.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1e4)
  camera.position.z = 2e3

  const fScene = new T.Scene()
  fScene.add(new T.AmbientLight(0x555555))

  let light = new T.SpotLight(0xffffff, 1.5)
  light.position.set(0, 5e2, 2e3)
  fScene.add(light)

  this.rotationSpeed = speed
  let color = geo.type === 'BoxGeometry' ? 0x0000ff : 0xff0000,
    material = new T.MeshPhongMaterial({ color, flatShading: true }),
    mesh = generateInstancedMesh(geo, material, 5e2)
  fScene.add(mesh)
  console.log(118, name, geo.type)

  this.webgl = webgl
  this.fScene = fScene

  this.fbo = new T.WebGLRenderTarget(window.innerWidth, window.innerHeight)

  this.render = function (delta, rtt) {
    // console.log(132, this.geo.type)
    mesh.rotation.x += delta * this.rotationSpeed.x
    mesh.rotation.y += delta * this.rotationSpeed.y
    mesh.rotation.z += delta * this.rotationSpeed.z

    webgl.setClearColor(this.clearColor)
    // console.log(135, scene)
    // debugger
    if (rtt) {
      webgl.setRenderTarget(this.fbo)
      webgl.clear()
      webgl.render(fScene, camera)
    } else {
      webgl.setRenderTarget(null)
      webgl.render(fScene, camera)
    }

  }


}

function Transition(sceneA, sceneB) {

  const scene = new T.Scene()
  const width = window.innerWidth,
    height = window.innerHeight
  const camera = new T.OrthographicCamera(- width / 2, width / 2, height / 2, -height / 2, -10, 10),
    textures = [],
    loader = new T.TextureLoader()

  for (let i = 0; i < 6; i++) {
    textures[i] = loader.load('./textures/transition/transition' + (i + 1) + '.png')
  }

  console.log(159, textures)

  const material = new T.ShaderMaterial({
    uniforms: {
      tDiffuse1: {
        value: null
      },
      tDiffuse2: {
        value: null
      },
      mixRatio: {
        value: 0
      },
      threshold: {
        value: .1
      },
      useTexture: {
        value: 1
      },
      tMixTexture: {
        value: textures[0]
      }
    },
    vertexShader: [
      'varying vec2 vUv ;',
      'void main () {',
      ' vUv = vec2(uv.x , uv.y) ;',
      ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0) ;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform float mixRatio ;',

      'uniform sampler2D tDiffuse1 ;',
      'uniform sampler2D tDiffuse2 ;',
      'uniform sampler2D tMixTexture ;',

      'uniform int useTexture ;',
      'uniform float threshold ;',

      'varying vec2 vUv ;',

      'void main () {',
      ' vec4 texel1 = texture2D(tDiffuse1,vUv) ;',
      ' vec4 texel2 = texture2D(tDiffuse2,vUv) ;',
      '// mix(x,y,a) 取x,y的线性混合 x*(1-a) + y*a',
      ' if(useTexture == 1 ){ ',
      '   vec4 transitionTexel = texture2D(tMixTexture,vUv); ',
      '   float r = mixRatio * (1.0 + threshold * 2.0) - threshold ;',
      '   float mixf = clamp( (transitionTexel.r - r) * (1.0 / threshold) , 0.0 , 1.0);',
      '   gl_FragColor = mix(texel1,texel2,mixf);',
      ' } else {',
      ' // gl_FragColor = vec4(1.0,.1,.1,.50) ; ',
      '   gl_FragColor = mix(texel2,texel1,mixRatio) ; ',
      ' }',
      '}'
    ].join('\n'),

  }),
    geo = new T.PlaneGeometry(window.innerWidth, window.innerHeight),
    mesh = new T.Mesh(geo, material)

  scene.add(mesh)
  console.log(224, sceneA,
    sceneB)
  material.uniforms.tDiffuse1.value = sceneA.fbo.texture
  material.uniforms.tDiffuse2.value = sceneB.fbo.texture

  new TWEEN.Tween(transitionParams)
    .to({ transition: 1 }, 3e3)
    .repeat(Infinity)
    .delay(2e2)
    .yoyo(true)
    .start()

  this.needsTextureChange = false
  this.setTextureThreshold = value => material.uniforms.threshold.value = value
  this.useTexture = value => material.uniforms.useTexture = value ? 1 : 0
  this.setTexture = i => material.uniforms.tMixTexture = textures[i]


  this.render = function (d) {
    // console.log(93, d)
    if (transitionParams.animate) {
      TWEEN.update()

      if (transitionParams.cycle) {
        if (transitionParams.transition == 0 || transitionParams.transition == 1) {
          if (this.needsTextureChange) {
            transitionParams.texture = (transitionParams.texture + 1) % textures.length
            material.uniforms.tMixTexture.value = textures[transitionParams.texture]
            this.needsTextureChange = false
          }

        } else {
          this.needsTextureChange = true
        }
      } else {
        this.needsTextureChange = true
      }

    }

    material.uniforms.mixRatio.value = transitionParams.transition



    if (transitionParams.transition == 0) {
      sceneB.render(d, false)
    } else if (transitionParams.transition == 1) {
      sceneA.render(d, false)
    } else {
      // When 0<transition<1 render transition between two scenes
      sceneB.render(d, true)
      sceneA.render(d, true)
      webgl.setRenderTarget(null)
      webgl.clear()
      webgl.render(scene, camera)
    }

  }


}
