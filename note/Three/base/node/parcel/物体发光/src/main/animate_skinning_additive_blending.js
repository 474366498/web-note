


import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

var scene, webgl, camera, stats, controls, model, skeleton, clock
var animations, numAnimations, mixer
const crossFadeControls = []
let currentBaseAction = 'idle'
const allActions = []
const baseActions = {
  idle: { weight: 1 },
  walk: { weight: 0 },
  run: { weight: 0 },
},
  additiveActions = {
    sneak_pose: { weight: 0 },
    sad_pose: { weight: 0 },
    agree: { weight: 0 },
    headShake: { weight: 0 },
  }
var panelSettings



init()
// animate()

function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e2)
  camera.position.set(-1, 2, 3)

  clock = new T.Clock()

  scene = new T.Scene()
  scene.background = new T.Clock(0xa0a0a0)
  scene.fog = new T.Fog(0xa0a0a0, 1e1, 5e1)

  addLights()

  const mesh = new T.Mesh(
    new T.PlaneGeometry(1e2, 1e2),
    new T.MeshPhongMaterial({
      color: 0x999999,
      depthWrite: false
    })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  const loader = new GLTFLoader()
  loader.load('./model/Xbot.glb', gltf => {
    console.log(51, gltf)
    model = gltf.scene
    scene.add(model)

    model.traverse(obj => {
      obj.isMesh && (obj.castShadow = true)
    })

    skeleton = new T.SkeletonHelper(model)
    skeleton.visible = true
    scene.add(skeleton)

    animations = gltf.animations,
      numAnimations = animations.length,
      mixer = new T.AnimationMixer(model)

    for (let i = 0; i !== numAnimations; ++i) {
      let clip = animations[i],
        name = clip.name

      if (baseActions[name]) {
        const action = mixer.clipAction(clip)
        activateAction(action)
        baseActions[name].action = action
        allActions.push(action)
      } else if (additiveActions[name]) {
        // Make the clip additive and remove the reference frame    使剪辑添加，并删除参考框架
        T.AnimationUtils.makeClipAdditive(clip)

        if (clip.name.endsWith('_pose')) {
          clip = T.AnimationUtils.subclip(clip, clip.name, 2, 3, 30)
        }

        const action = mixer.clipAction(clip)
        activateAction(action)
        additiveActions[name].action = action
        allActions.push(action)

      }

    }

    console.log(101, additiveActions, allActions)
    createPanel()
    animate()

  })


  webgl = new T.WebGLRenderer({
    antialias: true
  })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.outputColorSpace = T.SRGBColorSpace
  webgl.shadowMap.enabled = true
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)

  controls = new OrbitControls(camera, webgl.domElement)
  controls.enablePan = false
  controls.enableZoom = true
  controls.target.set(0, 1, 0)

}




function addLights() {
  scene.add(new T.GridHelper(4e2, 5e1, 0xff0000, 0xffff00))
  const hemiLight = new T.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)
  scene.add(new T.HemisphereLightHelper(hemiLight))

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(3, 10, 10)
  dirLight.castShadow = true
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = - 2;
  dirLight.shadow.camera.left = - 2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight)
  scene.add(new T.DirectionalLightHelper(dirLight))

}

function activateAction(action) {
  console.log(154, action)
  const clip = action.getClip()
  const settings = baseActions[clip.name] || additiveActions[clip.name]
  setWeight(action, settings.weight)
  action.play()

}

function setWeight(action, weight) {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}


function createPanel() {

  const panel = new GUI({ width: 320 })

  const f1 = panel.addFolder('Base Actions'),
    f2 = panel.addFolder('Additive Action Weights'),
    f3 = panel.addFolder('General Speed')

  panelSettings = {
    'modify time scale': 1
  }

  // "None", "idle", "walk", "run" 
  const baseNames = ['None', ...Object.keys(baseActions)]

  console.log(185, baseNames)
  for (let i = 0; i < baseNames.length; i++) {
    const name = baseNames[i],
      settings = baseActions[name]

    panelSettings[name] = function () {
      const currentSettings = baseActions[currentBaseAction],
        currentAction = currentSettings ? currentSettings.action : null,
        action = settings ? settings.action : null

      if (currentAction !== action) {
        prepareCrossFade(currentAction, action, .35)
      }
    }

    crossFadeControls.push(f1.add(panelSettings, name))

  }

  for (const name of Object.keys(additiveActions)) {
    const settings = additiveActions[name]
    panelSettings[name] = settings.weight
    // sneak_pose sad_pose  agree  headShake  摇头   偷偷的姿势 悲伤的姿势  agree
    f2.add(panelSettings, name, 0, 1, .01).listen().onChange(w => {
      console.log(209, name, w)
      setWeight(settings.action, w)
      settings.weight = w
    })
  }

  f3.add(panelSettings, 'modify time scale', 0, 2, .01).onChange(modifyTimeScale)

  crossFadeControls.forEach(control => {
    control.setInactive = function () {
      control.domElement.classList.add('control-inactive')
    }
    control.setActive = function () {
      control.domElement.classList.add('control-inactive')
    }
    const settings = baseActions[control.property]
    if (!settings || !settings.weight) {
      control.setInactive()
    }
  })

  console.log(231, f1, f2, f3, panelSettings, crossFadeControls)
}

// createPanel start
const prepareCrossFade = (sAction, eAction, duration) => {
  // If the current action is 'idle', execute the crossfade immediately;  else wait until the current action has finished its current loop      如果当前操作处于空闲状态，则立即执行crossfade，否则等待当前操作完成其当前循环
  debugger
  console.log(237, sAction, eAction, duration)
  if (currentBaseAction === 'idle' || !sAction || !eAction) {
    executeCrossFade(sAction, eAction, duration)
  } else {

    synchronizeCrossFade(sAction, eAction, duration)
  }

  if (eAction) {
    const clip = eAction.getClip()
    currentBaseAction = clip.name
  } else {
    currentBaseAction = 'None'
  }

  crossFadeControls.forEach(control => {
    let name = control.property

    if (name === currentBaseAction) {
      control.setActive()
    } else {
      control.setInactive()
    }

  })

},

  executeCrossFade = (sAction, eAction, duration) => {
    // Not only the start action, but also the end action must get a weight of 1 before fading (concerning the start action this is already guaranteed in this place)    不仅是开始动作，结束动作也必须在开始动作衰落之前获得1的权重，这在这里已经得到了保证
    if (eAction) {
      setWeight(eAction, 1)
      eAction.time = 0
      if (sAction) {
        // Crossfade with warping      交叉褪色与翘曲
        sAction.crossFadeTo(eAction, duration, true)
      } else {
        // Fade in 
        eAction.fadeIn(duration)
      }
    } else {
      sAction.fadeOut(duration)
    }

  },
  synchronizeCrossFade = (sAction, eAction, duration) => {
    mixer.addEventListener('loop', onLoopFinished)
    function onLoopFinished(event) {
      console.log(283, mixer, event)
      if (event.action === sAction) {
        mixer.removeEventListener('loop', onLoopFinished)
        executeCrossFade(sAction, eAction, duration)
      }
    }
  },
  modifyTimeScale = (speed) => {
    mixer.timeScale = speed
  }

// createPanel end  



function onWindowResize() {
  let w = window.innerWidth, h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  webgl.setSize(w, h)

}

function animate() {
  requestAnimationFrame(animate)

  for (let i = 0; i !== numAnimations; i++) {
    const action = allActions[i],
      clip = action.getClip(),
      settings = baseActions[clip.name] || additiveActions[clip.name]
    settings.weight = action.getEffectiveWeight()
  }
  // debugger
  const d = clock.getDelta()
  mixer.update(d)
  stats.update()

  webgl.render(scene, camera)
}






