

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import vertexShader from './shaders/water/vertex.glsl'
import fragmentShader from './shaders/water/fragment.glsl'

console.log(vertexShader, fragmentShader)

const gui = new dat.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)

camera.position.set(0, 0, 2)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(5e2))

const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
})

document.body.insertAdjacentElement('beforebegin', webgl.domElement)

const orbit = new OrbitControls(camera, webgl.domElement)

const clock = new T.Clock()

const params = {
  uWaresFrequency: 14,
  uScale: 3e-2,
  uXzScale: 1.5,
  uNoiseFrequency: 1e1,
  uNoiseScale: 1.5,
  uLowColor: '#ff0000',
  uHighColor: '#ff0',
  uXspeed: 1,
  uZspeed: 1,
  uNoiseSpeed: 1,
  uOpacity: 1
},
  shaderMaterial = new T.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: T.DoubleSide,
    uniforms: {
      uWaresFrequency: {
        value: params.uWaresFrequency
      },
      uScale: {
        value: params.uScale
      },
      uNoiseFrequency: {
        value: params.uNoiseFrequency
      },
      uNoiseScale: {
        value: params.uNoiseScale
      },
      uXzScale: {
        value: params.uXzScale
      },
      uTime: {
        value: params.uTime
      },
      uLowColor: {
        value: new T.Color(params.uLowColor)
      },
      uHighColor: {
        value: new T.Color(params.uHighColor)
      },
      uXspeed: {
        value: params.uXspeed
      },
      uZspeed: {
        value: params.uZspeed
      },
      uNoiseSpeed: {
        value: params.uNoiseSpeed
      },
      uOpacity: {
        value: params.uOpacity
      }
    }
  })

gui
  .add(params, "uWaresFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uWaresFrequency.value = value;
  });

gui
  .add(params, "uScale")
  .min(0)
  .max(1)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uScale.value = value;
  });

gui
  .add(params, "uNoiseFrequency")
  .min(1)
  .max(100)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseFrequency.value = value;
  });

gui
  .add(params, "uNoiseScale")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseScale.value = value;
  });

gui
  .add(params, "uXzScale")
  .min(0)
  .max(5)
  .step(0.1)
  .onChange((value) => {
    shaderMaterial.uniforms.uXzScale.value = value;
  });

gui.addColor(params, "uLowColor").onFinishChange((value) => {
  shaderMaterial.uniforms.uLowColor.value = new T.Color(value);
});
gui.addColor(params, "uHighColor").onFinishChange((value) => {
  shaderMaterial.uniforms.uHighColor.value = new T.Color(value);
});

gui
  .add(params, "uXspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uXspeed.value = value;
  });

gui
  .add(params, "uZspeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uZspeed.value = value;
  });

gui
  .add(params, "uNoiseSpeed")
  .min(0)
  .max(5)
  .step(0.001)
  .onChange((value) => {
    shaderMaterial.uniforms.uNoiseSpeed.value = value;
  });

gui
  .add(params, "uOpacity")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange((value) => {
    shaderMaterial.uniforms.uOpacity.value = value;
  });

const plane = new T.Mesh(
  new T.PlaneGeometry(1, 1, 1024, 1024),
  shaderMaterial
)

scene.add(plane)


animate()

function animate() {
  let elapsedTime = clock.getElapsedTime()

  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}



