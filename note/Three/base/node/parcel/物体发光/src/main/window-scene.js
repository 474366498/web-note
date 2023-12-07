
// https://mp.weixin.qq.com/s/dAeM4Og-6G14tdHHhM3GIA

import * as T from 'three'

console.log('量子纠缠')

var camera, scene, webgl, world
var near, far

var cubes = []
let sceneOffsetTarget = { x: 0, y: 0 },
  sceneOffset = { x: 0, y: 0 }

let today = new Date()
today.setHours(0)
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0)

let internalTime = getTime()
let windowManager
let initialized = false


function getTime() {
  return (new Date().getTime() - today) / 1e3
}

if (new URLSearchParams(window.location.search).get('clear')) {
  localStorage.clear()
} else {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState != 'hidden' && !initialized) {
      init()
    }
  })

  window.onload = () => {
    if (document.visibilityState != 'hidden') {
      init()
    }
  }

  function init() {
    initialized = true

    setTimeout(() => {
      setupScene()

      setupWindowManager()

      resize()

      updateWindowShape(false)

      render()

      window.addEventListener('resize', resize)

    }, 5e2)
  }

}

function setupScene() {
  camera = new T.OrthographicCamera(0, 0, window.innerWidth, window.innerHeight, -1e4, 1e4)
  camera.position.z = 2.5
  near = camera.position.z - .5
  far = camera.position.z + .5

  scene = new T.Scene()
  scene.background = new T.Color(0)
  scene.add(camera)

  webgl = new T.WebGLRenderer({ antialias: true, depthDuffer: true })
  webgl.setPixelRatio(window.devicePixelRatio)

  world = new T.Object3D()
  scene.add(world)

  webgl.domElement.setAttribute('id', 'scene')
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

}
function setupWindowManager() {
  windowManager = new WindowManager()
  windowManager.setWinShapeChangeCallback(updateWindowShape)
  windowManager.setWinChangeCallback(windowsUpdated)
  let metaData = { foo: 'bar' }

  windowManager.init(metaData)

  windowsUpdated()

}
function resize() {
  let w = window.innerWidth, h = window.innerHeight
  camera = new T.OrthographicCamera(0, w, 0, h, -1e4, 1e4)
  camera.updateProjectionMatrix()
  webgl.setSize(w, h)
}
function updateWindowShape(easing = true) {
  sceneOffsetTarget = { x: - window.screenX, y: -window.screenY }
  if (!easing) sceneOffset = sceneOffsetTarget
}
function render() {
  let t = getTime()
  windowManager.update()

  let falloff = .05
  sceneOffset.x = sceneOffset.x + ((sceneOffsetTarget.x - sceneOffset.x) * falloff);
  sceneOffset.y = sceneOffset.y + ((sceneOffsetTarget.y - sceneOffset.y) * falloff);

  world.position.x = sceneOffset.x
  world.position.y = sceneOffset.y

  let wins = windowManager.getWindows()
  // console.log(119, wins)
  // debugger

  for (let i = 0; i < cubes.length; i++) {
    let cube = cubes[i], win = wins[i], _t = t
    // console.log(122, i, win, win.shape)
    let posTarget = {
      x: win.shape.x + (win.shape.w * .5),
      y: win.shape.y + (win.shape.h * .5)
    }
    cube.position.x = cube.position.x + (posTarget.x - cube.position.x) * falloff
    cube.position.y = cube.position.y + (posTarget.y - cube.position.y) * falloff
    cube.rotation.x = _t * .5
    cube.rotation.y = _t * .3

  }

  webgl.render(scene, camera)
  // debugger
  requestAnimationFrame(render)

}

function windowsUpdated() {
  updateNumberOfCubes()
}

function updateNumberOfCubes() {
  let wins = windowManager.getWindows()
  cubes.forEach(C => world.remove(C))

  cubes = []

  for (let i = 0; i < wins.length; i++) {
    let win = wins[i]
    let c = new T.Color()
    c.setHSL(i * .1, 1.0, .5)
    let s = 100 + i * 50
    let cube = new T.Mesh(
      new T.BoxGeometry(s, s, s),
      new T.MeshBasicMaterial({
        color: c,
        wireframe: true
      })
    )
    cube.position.x = win.shape.x + (win.shape.w * .5)
    cube.position.y = win.shape.y + (win.shape.h * .5)
    world.add(cube)
    cubes.push(cube)
  }

}












class WindowManager {
  constructor() {
    let that = this

    addEventListener('storage', event => {
      if (event.key == 'windows') {
        let newWindows = JSON.parse(event.newValue)
        let winChange = that.didWindowsChange(that.windows, newWindows)
        that.windows = newWindows

        if (winChange) {
          if (that.winChangeCallback) that.winChangeCallback()
        }

      }
    })
    window.addEventListener('beforeunload', e => {
      let index = that.getWindowIndexFromId(that.id)
      that.windows.splice(index, 1)
      that.updateWindowsLocalStorage()
    })
  }
  didWindowsChange(pWins, nWins) {
    if (pWins.length != nWins.length) {
      return true
    } else {
      let c = false
      for (let i = 0; i < pWins.length; i++) {
        if (pWins[i].id != nWins[i].id) c = true
      }
      return c
    }

  }

  init(metaData) {
    this.windows = JSON.parse(localStorage.getItem('windows')) || []
    this.count = localStorage.getItem('count') || 0
    this.count++

    this.id = this.count
    let shape = this.getWinShape()
    this.winData = {
      id: this.id,
      shape,
      metaData
    }
    this.windows.push(this.winData)
    this.updateWindowsLocalStorage()
  }
  getWinShape() {
    let shape = {
      x: window.screenLeft,
      y: window.screenTop,
      w: window.innerWidth,
      h: window.innerHeight
    }
    return shape
  }
  setWinChangeCallback(callback) {
    this.winChangeCallback = callback
  }

  setWinShapeChangeCallback(callback) {
    this.winShapeChangeCallback = callback
  }
  getWindowIndexFromId(id) {
    let index = -1
    for (let i = 0; i < this.windows.length; i++) {
      if (this.windows[i].id == id) index = i
    }
    return index
  }

  updateWindowsLocalStorage() {
    localStorage.setItem('windows', JSON.stringify(this.windows))
  }
  update() {
    let winShape = this.getWinShape()

    if (winShape.x !== this.winData.shape.x || winShape.y !== this.winData.shape.y || winShape.w !== this.winData.shape.w || winShape.h !== this.winData.shape.h) {
      this.winData.shape = winShape
      let index = this.getWindowIndexFromId(this.id)
      this.windows[index].shape = winShape
      if (this.winShapeChangeCallback) this.winShapeChangeCallback()
      this.updateWindowsLocalStorage()
    }
  }

  getWindows() {
    return this.windows
  }

  getThisWindowData() {
    return this.winData
  }

  getThisWindowID() {
    return this.id
  }
}



























