
import { extend } from '@vue/shared'
import { nodeOpts } from './nodeOps'
import { patchProp } from './patchProp'

import { createRender } from '@vue/runtime-core'

const domOpts = extend({ patchProp }, nodeOpts)

export { domOpts }

export const createApp = (...args) => {
  // let app = {
  //   mount: (el) => {
  //     console.log('mount', App, el)
  //   }
  // }
  const app = createRender().createApp(...args)
  console.log(19, app)
  return app
}


// function ensureRenderer() {
//   return {
//     createApp: function (...args) {
//       return {
//         mount: (container) => {
//           container = document.querySelector(container)
//           container.innerHTML = '清空'
//           console.log(30, args, container)
//         }
//       }
//     }
//   }
// }



/**
 * let app = createApp(App)
   app.mount('#app')
 */