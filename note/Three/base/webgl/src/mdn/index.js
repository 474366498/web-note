import {
  createCubeData,
  createBuffersForCube,
  drawCube
} from './cube'

import { bunnyModel } from './bunny-model'

import {
  matrixArrayToCssMatrix,
  multiplyPoint,
  multiplyMatrices,
  multiplyArrayOfMatrices,
  normalMatrix,
  rotateXMatrix,
  rotateYMatrix,
  rotateZMatrix,
  translateMatrix,
  scaleMatrix,
  perspectiveMatrix,
  orthographicMatrix,
  normalize,
  invertMatrix
} from './matrices'


import {
  createShader,
  linkProgram,
  createWebGLProgram,
  createWebGLProgramFromIds,
  createContext
} from './shaders'

const MDN = {
  createCubeData,
  createBuffersForCube,
  drawCube,

  bunnyModel,

  matrixArrayToCssMatrix,
  multiplyPoint,
  multiplyMatrices,
  multiplyArrayOfMatrices,
  normalMatrix,
  rotateXMatrix,
  rotateYMatrix,
  rotateZMatrix,
  translateMatrix,
  scaleMatrix,
  perspectiveMatrix,
  orthographicMatrix,
  normalize,
  invertMatrix,

  createShader,
  linkProgram,
  createWebGLProgram,
  createWebGLProgramFromIds,
  createContext

}

export {
  MDN
}

// export {
//   createShader,
//   linkProgram,
//   createWebGLProgram,
//   createWebGLProgramFromIds
// }