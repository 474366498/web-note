<template>
  <section>
    <!-- <AppHeader />  -->
    <!-- <NuxtWelcome /> -->
    <!-- <div>nuxt-hello</div> -->
    <NuxtLayout>
      <div id="layout-main-">
      <NuxtLoadingIndicator color="#ff0000" :height="30" :duration="5000" :throttle="2000" />
      <NuxtPage /> 
      <BaseComponent />
      </div>
    </NuxtLayout>
    
    <!-- 
      <ComFooButton /> 
      <Button /> 
    -->

  </section>
</template>

<script setup lang="ts">

const foo = useFoo() , use = useUse() , test = useTest()

console.log('app.vue 26', foo.value, use.value, test.value)

const appInfo = useNuxtApp()
console.log('app.vue appInfo of keys:',Object.keys(appInfo) ) 
appInfo.provide('appVue','appVue')
// const { data,pending,error , refresh } = await useAsyncData('mountains',()=>$fetch('https://api.nuxtjs.dev/mountains'))

// console.log('app asyncData' , data,pending,error , refresh )

</script>

<style lang="scss">
@use '~/assets/index.import.scss';


.page-enter-active , .page-leave-active {
  transition:all 4s ;
}

.page-leave-to , .page-enter-from {
  opacity: .1; 
  filter : blur(1rem);
}

</style>