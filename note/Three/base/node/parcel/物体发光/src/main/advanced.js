
import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'


import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader'
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader'
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader'
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader'
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


var composerScene, composer1, composer2, composer3, composer4
var cameraOrtho, cameraPerspective, sceneModel, sceneBg, webgl, directionalLight, stats, mesh

const width = window.innerWidth, height = window.innerHeight, halfW = width / 2, halfH = height / 2

let quadBG, quadMask, webglScene

const delta = .01

init()
animate()

function init() {

  cameraOrtho = new T.OrthographicCamera(-halfW, halfW, halfH, -halfH, -1e4, 1e4)
  cameraOrtho.position.z = 1e2

  cameraPerspective = new T.PerspectiveCamera(50, width / height, 1, 1e4)
  cameraPerspective.position.z = 9e2

  sceneModel = new T.Scene()
  sceneBg = new T.Scene()

  directionalLight = new T.DirectionalLight(0xffffff)
  directionalLight.position.set(0, 1, 1).normalize()
  sceneModel.add(directionalLight)

  const loader = new GLTFLoader()
  loader.load('./model/LeePerrySmith.glb', gltf => {
    createMesh(gltf.scene.children[0].geometry, sceneModel, 1e2)
  })

  const diffuseMap = new T.TextureLoader().load('./textures/pz.jpg')
  diffuseMap.encoding = T.sRGBEncoding
  const materialColor = new T.MeshBasicMaterial({
    map: diffuseMap,
    depthTest: false
  })

  quadBG = new T.Mesh(new T.PlaneGeometry(1, 1), materialColor)
  quadBG.position.z = -5e2
  quadBG.scale.set(width, height, 1)
  sceneBg.add(quadBG)

  const sceneMask = new T.Scene()
  quadMask = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ color: 0xffaa00 }))
  quadMask.position.z = -3e2
  quadMask.scale.set(halfW, halfH, 1)
  sceneMask.add(quadMask)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(width, height)
  webgl.autoClear = false

  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  const shaderBleach = BleachBypassShader,
    shaderSepia = SepiaShader,
    shaderVignette = VignetteShader

  const effectBleach = new ShaderPass(shaderBleach),
    effectSepia = new ShaderPass(shaderSepia),
    effectVignette = new ShaderPass(shaderVignette),
    gammaCorrection = new ShaderPass(GammaCorrectionShader)

  effectBleach.uniforms['opacity'].value = .95
  effectSepia.uniforms['amount'].value = .9
  effectVignette.uniforms['offset'].value = .95
  effectVignette.uniforms['darkness'].value = 1.6

  const effectBloom = new BloomPass(0.5);
  const effectFilm = new FilmPass(0.35, 0.025, 648, false);
  const effectFilmBW = new FilmPass(0.35, 0.5, 2048, true);
  const effectDotScreen = new DotScreenPass(new T.Vector2(0, 0), 0.5, 0.8);

  const effectHBlur = new ShaderPass(HorizontalBlurShader);
  const effectVBlur = new ShaderPass(VerticalBlurShader);
  effectHBlur.uniforms['h'].value = 2 / (width / 2);
  effectVBlur.uniforms['v'].value = 2 / (height / 2);

  const effectColorify1 = new ShaderPass(ColorifyShader);
  const effectColorify2 = new ShaderPass(ColorifyShader);
  effectColorify1.uniforms['color'] = new T.Uniform(new T.Color(1, 0.8, 0.8));
  effectColorify2.uniforms['color'] = new T.Uniform(new T.Color(1, 0.75, 0.5));

  const clearMask = new ClearMaskPass();
  const renderMask = new MaskPass(sceneModel, cameraPerspective);
  const renderMaskInverse = new MaskPass(sceneModel, cameraPerspective);

  renderMaskInverse.inverse = true;

  //

  const rtParameters = {
    stencilBuffer: true
  };

  const rtWidth = width / 2;
  const rtHeight = height / 2;

  //

  const renderBackground = new RenderPass(sceneBg, cameraOrtho);
  const renderModel = new RenderPass(sceneModel, cameraPerspective);

  renderModel.clear = false;

  composerScene = new EffectComposer(webgl, new T.WebGLRenderTarget(rtWidth * 2, rtHeight * 2, rtParameters));

  composerScene.addPass(renderBackground);
  composerScene.addPass(renderModel);
  composerScene.addPass(renderMaskInverse);
  composerScene.addPass(effectHBlur);
  composerScene.addPass(effectVBlur);
  composerScene.addPass(clearMask);

  //

  webglScene = new TexturePass(composerScene.renderTarget2.texture);

  //

  composer1 = new EffectComposer(webgl, new T.WebGLRenderTarget(rtWidth, rtHeight, rtParameters));

  composer1.addPass(webglScene);
  composer1.addPass(gammaCorrection);
  composer1.addPass(effectFilmBW);
  composer1.addPass(effectVignette);

  //

  composer2 = new EffectComposer(webgl, new T.WebGLRenderTarget(rtWidth, rtHeight, rtParameters));

  composer2.addPass(webglScene);
  composer2.addPass(gammaCorrection);
  composer2.addPass(effectDotScreen);
  composer2.addPass(renderMask);
  composer2.addPass(effectColorify1);
  composer2.addPass(clearMask);
  composer2.addPass(renderMaskInverse);
  composer2.addPass(effectColorify2);
  composer2.addPass(clearMask);
  composer2.addPass(effectVignette);

  //

  composer3 = new EffectComposer(webgl, new T.WebGLRenderTarget(rtWidth, rtHeight, rtParameters));

  composer3.addPass(webglScene);
  composer3.addPass(gammaCorrection);
  composer3.addPass(effectSepia);
  composer3.addPass(effectFilm);
  composer3.addPass(effectVignette);

  //

  composer4 = new EffectComposer(webgl, new T.WebGLRenderTarget(rtWidth, rtHeight, rtParameters));

  composer4.addPass(webglScene);
  composer4.addPass(gammaCorrection);
  composer4.addPass(effectBloom);
  composer4.addPass(effectFilm);
  composer4.addPass(effectBleach);
  composer4.addPass(effectVignette);

  webglScene.uniforms['tDiffuse'].value = composerScene.renderTarget2.texture;

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

}

function createMesh(geo, scene, scale) {
  const diffuseMap = new T.TextureLoader().load('./model/Map-COL.jpg')
  diffuseMap.encoding = T.sRGBEncoding

  const mat2 = new T.MeshPhongMaterial({
    color: 0x999999,
    specular: 0x080808,
    shininess: 2e1,
    map: diffuseMap,
    normalMap: new T.TextureLoader().load('./model/Infinite-Level_02_Tangent_SmoothUV.jpg'),
    normalScale: new T.Vector2(.75, .75)
  })

  mesh = new T.Mesh(geo, mat2)
  mesh.position.set(0, -50, 0)
  mesh.scale.set(scale, scale, scale)

  scene.add(mesh)

}


function animate() {
  requestAnimationFrame(animate)
  stats.begin()
  // webgl.render(sceneModel, cameraPerspective)
  const time = Date.now() * .0004
  if (mesh) mesh.rotation.y = -time
  webgl.setViewport(0, 0, halfW, halfH)
  composerScene.render(delta)

  webgl.setViewport(0, 0, halfW, halfH)
  composer1.render(delta)

  webgl.setViewport(halfW, 0, halfW, halfH)
  composer2.render(delta)

  webgl.setViewport(0, halfH, halfW, halfH)
  composer3.render(delta)

  webgl.setViewport(halfW, halfH, halfW, halfH)
  composer4.render(delta)

  stats.end()
}
