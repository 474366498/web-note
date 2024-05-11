export const useTest = () => {
  // const nuxtApp = useNuxtApp()
  const foo = useFoo()
  console.log(4, foo)
  return useState('test', () => {
    return foo.value + ' value'
  })
}