

import * as T from 'three'
import * as d3 from 'd3'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
document.body.insertAdjacentElement('afterbegin', stats.dom)

const scene = new T.Scene(), camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e4)
camera.position.set(0, 0, 1e2)
scene.add(camera)
scene.add(new T.AxesHelper(5e2))

const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

document.body.insertAdjacentElement('afterbegin', webgl.domElement)

console.log(23, d3)
const loader = new T.FileLoader(),
  center = d3.geoMercator().center([104, 30]).translate([0, 0, 0]),
  map = new T.Object3D()

// loader.load("./echarts-map-data-master/china.json", data => {
//   data = JSON.parse(data)
//   console.log(24, data)
//   operationData(data)
// })

// loader.load("./echarts-map-data-master/china-city/china-city-mapping.json", cities => {
//   cities = JSON.parse(cities)
//   // console.log(35, cities)

//   Object.entries(cities).forEach(([key, val]) => {
//     // console.log(37, key, val)
//     let url = `https://geo.datav.aliyun.com/areas_v3/bound/${val}_full.json`
//     loader.load(url, data => {
//       // console.log(41, key, data)
//       data = JSON.parse(data)
//       operationData(data)
//     }, xhr => {
//       // console.log(43, (xhr.loaded / xhr.total * 100) + '% loaded')
//     }, error => {
//       // console.log(45, error)
//       let url = `https://geo.datav.aliyun.com/areas_v3/bound/${Math.floor(val / 1e3) * 1e3}_full.json`
//       loader.load(url, data => {
//         data = JSON.parse(data)
//         operationData(data)
//       })
//     })
//   })
// })

loader.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json', sc => {
  sc = JSON.parse(sc)
  console.log(34, sc)
  operationData(sc)
})


function operationData(data) {
  var { features } = data

  features.forEach(feature => {
    const province = new T.Object3D()

    province.name = feature.properties.name
    province.properties = feature.properties

    let { coordinates, type } = feature.geometry

    // console.log(40, province.name, type)
    let color = new T.Color(
      .5 + .5 * Math.random(),
      Math.random(),
      Math.random(),
    )
    if (type === 'Polygon') {
      coordinates.forEach(coordinate => {
        const mesh = drawExtrudeMesh(coordinate, color, center),
          line = lineDraw(coordinate, color, center)
        province.add(mesh)
        province.add(line)
        // console.log(44, mesh)
      })
    } else if (type === 'MultiPolygon') {
      coordinates.forEach(coordinate => {
        coordinate.forEach(rows => {
          const mesh = drawExtrudeMesh(rows, color, center),
            line = lineDraw(rows, color, center)
          province.add(mesh)
          province.add(line)
        })
      })
    }
    // console.log(63, province)
    map.add(province)
  })
  scene.add(map)
}

function drawExtrudeMesh(polygon, color = (.5 * Math.random() * .5) * 0xffffff, c, depth = 2) {
  const shape = new T.Shape()
  polygon.forEach((row, i) => {
    let [x, y] = c(row)
    if (!i) {
      shape.moveTo(x, -y)
    }
    shape.lineTo(x, -y)
  })

  const geometry = new T.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true
  })

  const material = new T.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: .5
  })
  return new T.Mesh(geometry, material)
}

function lineDraw(polygon, color = (.5 + Math.random() * .5) * 0xffffff, center, depth = 2.2) {
  const lineGeo = new T.BufferGeometry(),
    pointsArray = new Array()
  polygon.forEach(row => {
    const [x, y] = center(row)
    pointsArray.push(new T.Vector3(x, -y, depth))
  })
  // console.log(pointsArray)
  lineGeo.setFromPoints(pointsArray)
  let material = Math.random() < .5 ? new T.LineBasicMaterial({
    color
  }) : new T.LineDashedMaterial({
    color
  })
  return new T.Line(lineGeo, material)
}


const controls = new OrbitControls(camera, webgl.domElement)
controls.enableZoom = true
controls.minDistance = 3e1
controls.maxDistance = 2e2

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})

const raycaster = new T.Raycaster(),
  mouse = new T.Vector2()

var lastPick = null

window.addEventListener('click', event => {
  mouse.x = event.clientX / window.innerWidth * 2 - 1
  mouse.y = - event.clientY / window.innerHeight * 2 + 1
  console.log(131, mouse)
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects([map], true)
  console.log(135, intersects)
  if (intersects.length < 1) return
  if (lastPick) {
    lastPick.object.material.opacity = .5
    intersects[0].object.material.opacity = .9
    lastPick = intersects[0]
  } else {
    lastPick = intersects[0]
    console.log(141, lastPick)
    lastPick.object.material.opacity = .9
  }
})

animate()

function animate() {
  webgl.render(scene, camera)
  stats.update()
  requestAnimationFrame(animate)

}





