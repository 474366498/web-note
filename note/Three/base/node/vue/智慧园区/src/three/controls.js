import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

import scene from './scene'
import Camera from './camera'
import webgl from './webgl'
import eventHub from '@/utils/eventHub'


class ControlsModule {
  constructor() {

    this.setOrbit()
    eventHub.on('toggleControls', key => {
      let fn = `set${key.substr(0, 1).toUpperCase()}${key.substr(1)}`
      this[fn]()
      console.log(15, key, fn, this)
    })
  }

  setOrbit() {
    this.name = 'OrbitControls'
    this.controls = new OrbitControls(Camera.active, webgl.domElement)
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
    this.controls.target.copy({
      x: -815,
      y: 143.5,
      z: 70
    })
    this.controls.update()
  }

  setPerson() {
    this.name = 'FirstPersonControls'
    // console.log(35)
    this.controls = new FirstPersonControls(Camera.active, webgl.domElement)
    this.controls.movementSpeed = 1e2
    this.controls.rollSpeed = Math.PI / 60
  }

  setFly() {
    this.name = 'FlyControls'
    // console.log(29)
    this.controls = new FlyControls(Camera.active, webgl.domElement)
    this.controls.movementSpeed = 1e2
    this.controls.rollSpeed = Math.PI / 60
  }

}


export default new ControlsModule()