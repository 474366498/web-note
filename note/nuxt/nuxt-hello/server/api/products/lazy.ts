
import data from './products.json'


export default defineEventHandler(async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data)
    }, 4e3);
  })
})