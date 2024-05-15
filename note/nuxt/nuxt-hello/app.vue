<template>
  <section>
    <!-- <AppHeader />  -->
    <!-- <NuxtWelcome /> -->
    <!-- <div>nuxt-hello</div> -->
    <NuxtLayout>
      <NuxtPage /> 
    </NuxtLayout>
    
    <!-- 
      <ComFooButton /> 
      <Button /> 
    -->

  </section>
</template>

<script setup lang="ts">

const foo = useFoo() , use = useUse() , test = useTest()

console.log('app',foo , use , test)

// const { data,pending,error , refresh } = await useAsyncData('mountains',()=>$fetch('https://api.nuxtjs.dev/mountains'))

// console.log('app asyncData' , data,pending,error , refresh )

</script>

<style lang="scss">
@use '~/assets/index.import.scss';

</style>