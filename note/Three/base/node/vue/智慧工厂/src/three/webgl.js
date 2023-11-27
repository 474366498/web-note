
import * as T from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export const webgl = new T.WebGLRenderer({
  logarithmicDepthBuffer: true,
  physicallyCorrectLights: true,
  antialias: true,
  alpha: true
})
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
webgl.shadowMap.enabled = true
webgl.toneMapping = T.ACESFilmicToneMapping
webgl.toneMappingExposure = .8


export const cssWebgl = new CSS3DRenderer()
cssWebgl.setSize(window.innerWidth, window.innerHeight)
document.getElementById('css3d').insertAdjacentElement('afterbegin', cssWebgl.domElement)


// export default webgl
// export default cssWebgl
