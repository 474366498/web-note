import * as T from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
const scene = new T.Scene()

scene.add(new T.AxesHelper(5e3))
scene.add(new T.GridHelper(3e3))

const bgLoader = new RGBELoader()
bgLoader.loadAsync('./textures/023.hdr').then(bg => {
  scene.background = bg
  scene.environment = bg
  scene.environment.mapping = T.EquirectangularReflectionMapping
})

const light = new T.DirectionalLight(0xffffff, 1)
light.position.set(10, 1e2, 10)
scene.add(light)

scene.add(new T.DirectionalLightHelper(light))




const lightGroup = new T.Group()
lightGroup.name = '灯光组'

let d = new T.DirectionalLight(0Xffffff)
d.position.set(-815, 143.5 + 50, 70)
d.target.position.set(-815, 143.5, 70)
lightGroup.add(d)
// scene.add(new T.DirectionalLightHelper(d))

for (let i = -2; i < 3; i++) {
  for (let j = -2; j < 3; j++) {
    let d = new T.DirectionalLight(i % 2 == 0 ? 0Xffff00 : 0x00ffff, 1 - i / 10 + j / 10)
    d.position.set(-815 + i * 10, 200, 50 + j * 10)
    d.target.position.set(-815, 143.5, 70)
    d.name = `group_${i + 2}_${j + 2}`
    lightGroup.add(d)
  }
}

scene.add(lightGroup)



// const curve = new T.EllipseCurve(-815, 143.5, 10, 10, 0, 2 * Math.PI, false)
// const points = curve.getPoints(36)

// const ellipse = new T.Line(
//   new T.BufferGeometry().setFromPoints(points),
//   new T.LineBasicMaterial({ color: 0xff0000 })
// )
// ellipse.geometry.rotateX(Math.PI / 2)
// console.log(30, ellipse)
// ellipse.position.set(35, 184, -70)
// scene.add(ellipse)


// const ellipseFolder = new GUI().addFolder('circle')
// const params = {
//   x: 0,
//   y: 0.5,
//   z: 0
// }
// Object.keys(params).forEach(key => {
//   console.log(41, key)
//   ellipseFolder.add(params, key, key !== 'y' ? -80 : 100, key !== 'y' ? 80 : 300)
//     .step(.1).onChange(val => {
//       let p = ellipse.position.clone()
//       p[key] = val
//       ellipse.position.set(p.x, p.y, p.z)
//       // console.log(46, ellipse, p)
//     })
// })



/*
 x: -815,
  y: 143.5,
  z: 70
*/

export default scene 