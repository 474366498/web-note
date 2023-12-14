


import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

var scene, webgl, camera, stats, controls, model, animations, skeleton, mixer, clock

const crossFadeControls = []

var idleAction, walkAction, runAction
var idleWeight, walkWeight, runWeight

var actions, settings

let singleStepMode = false, sizeOfNextStep = 0

init()



function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.set(1, 2, -3)
  camera.lookAt(0, 1, 0)

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
  loader.load('./model/Soldier.glb', gltf => {
    console.log(51, gltf)
    model = gltf.scene
    animations = gltf.animations
    scene.add(model)

    model.traverse(obj => {
      if (obj.isMesh) obj.castShadow = true
    })

    skeleton = new T.SkeletonHelper(model)
    skeleton.visible = false
    scene.add(skeleton)

    createPanel()

    mixer = new T.AnimationMixer(model)

    idleAction = mixer.clipAction(animations[0])
    walkAction = mixer.clipAction(animations[3])
    runAction = mixer.clipAction(animations[1])

    actions = [idleAction, walkAction, runAction]

    activateAllActions()
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

}

function addLights() {
  scene.add(new T.GridHelper(4e2, 5e1, 0xff0000, 0xffff00))
  const hemiLight = new T.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)
  scene.add(new T.HemisphereLightHelper(hemiLight))

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(-3, 10, -10)
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

function createPanel() {

  const panel = new GUI({ width: 320 })

  const folder1 = panel.addFolder('Visibility'),
    folder2 = panel.addFolder('Activation/Deactivation'),
    folder3 = panel.addFolder('Pausing/Stepping'),
    folder4 = panel.addFolder('Crossfading'),
    folder5 = panel.addFolder('Blend Weights'),
    folder6 = panel.addFolder('General Speed')

  settings = {
    'show model': true,
    'show skeleton': false,
    'deactivate all': deactivateAllActions,
    'activate all': activateAllActions,
    'pause/continue': pauseContinue,
    'make single step': toSingleStepMode,
    'modify step size': 0.05,
    'from walk to idle': function () {

      prepareCrossFade(walkAction, idleAction, 1.0);

    },
    'from idle to walk': function () {

      prepareCrossFade(idleAction, walkAction, 0.5);

    },
    'from walk to run': function () {

      prepareCrossFade(walkAction, runAction, 2.5);

    },
    'from run to walk': function () {

      prepareCrossFade(runAction, walkAction, 5.0);

    },
    'use default duration': true,
    'set custom duration': 3.5,
    'modify idle weight': 0.0,
    'modify walk weight': 1.0,
    'modify run weight': 0.0,
    'modify time scale': 1.0
  }
  folder1.add(settings, 'show model').name('show model 显示模型').onChange(showModel);
  folder1.add(settings, 'show skeleton').name('显示骨骼').onChange(showSkeleton);
  folder2.add(settings, 'deactivate all').name('关闭全部');
  folder2.add(settings, 'activate all').name('激活所有');
  folder3.add(settings, 'pause/continue').name('暂停/继续');
  folder3.add(settings, 'make single step').name('单步完成');
  folder3.add(settings, 'modify step size', 0.01, 0.1, 0.001).name('修改步长');
  crossFadeControls.push(folder4.add(settings, 'from walk to idle').name('从步行到散步'));
  crossFadeControls.push(folder4.add(settings, 'from idle to walk').name('从散步到行走'));
  crossFadeControls.push(folder4.add(settings, 'from walk to run').name('从走路到跑步'));
  crossFadeControls.push(folder4.add(settings, 'from run to walk').name('从跑到走'));
  folder4.add(settings, 'use default duration').name('使用默认持续时间');
  folder4.add(settings, 'set custom duration', 0, 10, 0.01).name('设置自定义持续时间');
  folder5.add(settings, 'modify idle weight', 0.0, 1.0, 0.01).name('调整怠重').listen().onChange(function (weight) {

    setWeight(idleAction, weight);

  });
  folder5.add(settings, 'modify walk weight', 0.0, 1.0, 0.01).name('调整步行体重').listen().onChange(function (weight) {

    setWeight(walkAction, weight);

  });
  folder5.add(settings, 'modify run weight', 0.0, 1.0, 0.01).name('调整运行重量').listen().onChange(function (weight) {

    setWeight(runAction, weight);

  });
  folder6.add(settings, 'modify time scale', 0.0, 1.5, 0.01).name('修改时间尺度').onChange(modifyTimeScale);

  folder1.open();
  folder2.open();
  folder3.open();
  folder4.open();
  folder5.open();
  folder6.open();

}
const activateAllActions = () => {
  console.log(209)
  setWeight(idleAction, settings['modify idle weight'])
  setWeight(walkAction, settings['modify walk weight'])
  setWeight(runAction, settings['modify run weight'])
  actions.forEach(action => action.play())
},
  setWeight = (action, weight) => {
    console.log(216, action, weight)
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  },
  deactivateAllActions = () => {
    console.log(220, actions)
    actions.forEach(action => action.stop())
  },
  pauseContinue = () => {
    if (singleStepMode) {
      singleStepMode = false
      unPauseAllActions()
    } else {
      if (idleAction.paused) {
        unPauseAllActions()
      } else {
        pauseAllActions()
      }
    }
  },
  unPauseAllActions = () => {
    actions.forEach(action => (action.paused = false))
  },
  pauseAllActions = () => {
    actions.forEach(action => (action.paused = true))

  },
  toSingleStepMode = () => {
    unPauseAllActions()
    singleStepMode = true
    sizeOfNextStep = settings['modify step size']
  }

const showModel = (visibility) => {
  model.visible = visibility
},
  showSkeleton = (visibility) => {
    skeleton.visible = visibility
  },
  modifyTimeScale = (speed) => {
    mixer.timeScale = speed
  }

function prepareCrossFade(startAction, endAction, defaultDuration) {

  const duration = setCrossFadeDuration(defaultDuration)
  console.log(263, duration)
  singleStepMode = false
  unPauseAllActions()

  if (startAction === idleAction) {
    executeCrossFade(startAction, endAction, duration)
  } else {
    synchronizeCrossFade(startAction, endAction, duration)
  }

}

const setCrossFadeDuration = (defaultDuration) => {
  if (settings['use default duration']) {
    return defaultDuration
  } else {
    return settings['set custom duration']
  }
}, executeCrossFade = (s, e, d) => {
  // Not only the start action, but also the end action must get a weight of 1 before fading
  // (concerning the start action this is already guaranteed in this place)

  setWeight(e, 1)
  e.time = 0

  // Crossfade with warping - you can also try without warping by setting the third parameter to false
  s.crossFadeTo(e, d, true)
},
  synchronizeCrossFade = (s, e, d) => {
    mixer.addEventListener('loop', onLoopFinished)
    function onLoopFinished(event) {
      if (event.action === s) {
        mixer.removeEventListener('loop', onLoopFinished)
        executeCrossFade(s, e, d)
      }
    }
  }





function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)

}


function updateWeightSliders() {
  settings['modify idle weight'] = idleWeight
  settings['modify walk weight'] = walkWeight
  settings['modify run weight'] = runWeight
}
function updateCrossFadeControls() {
  if (idleWeight === 1 && walkWeight === 0 && runWeight === 0) {
    crossFadeControls[0].disable()
    crossFadeControls[1].enable()
    crossFadeControls[2].disable()
    crossFadeControls[3].disable()
  }
  if (idleWeight === 0 && walkWeight === 1 && runWeight === 0) {
    crossFadeControls[0].enable()
    crossFadeControls[1].disable()
    crossFadeControls[2].enable()
    crossFadeControls[3].disable()
  }
  if (idleWeight === 0 && walkWeight === 0 && runWeight === 1) {
    crossFadeControls[0].disable()
    crossFadeControls[1].disable()
    crossFadeControls[2].disable()
    crossFadeControls[3].enable()
  }
}

function animate() {
  requestAnimationFrame(animate)
  // if (idleAction) {

  idleWeight = idleAction.getEffectiveWeight()
  walkWeight = walkAction.getEffectiveWeight()
  runWeight = runAction.getEffectiveWeight()

  // console.log(331, idleAction, idleWeight)
  updateWeightSliders()

  updateCrossFadeControls()
  // }

  let delta = clock.getDelta()

  if (singleStepMode) {
    delta = sizeOfNextStep
    sizeOfNextStep = 0
  }
  // console.log(361, mixer, delta)
  mixer.update(delta)
  stats.update()

  webgl.render(scene, camera)
}






