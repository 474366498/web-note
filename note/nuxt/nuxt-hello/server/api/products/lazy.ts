
import data from './products.json'


export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()

  // console.log('api lazy', runtimeConfig.shoeStoreApiSecret, runtimeConfig.serverApi, runtimeConfig.public.shoeStoreApiBase)
  // api lazy my-secret-key /shoe-api
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data)
    }, 4e3);
  })
})