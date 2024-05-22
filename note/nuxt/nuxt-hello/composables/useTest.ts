export const useTest = () => {
  // const nuxtApp = useNuxtApp()
  const foo = useFoo()
  console.log('composables 4', foo.value)
  return useState('test', () => {
    return foo.value + ' value'
  })
}