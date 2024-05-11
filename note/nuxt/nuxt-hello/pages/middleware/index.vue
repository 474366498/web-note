<template>
  <div> nuxt middleware </div>
  
</template>

<script setup>
let $A = useNuxtApp()
console.log(7, $A)
definePageMeta({
  middleware: [
    // function (to, from) {
    //     console.log('middleware route',to,from)
    // },
    //   'user'
    // () => { $A._middleware.named()}
    'named-test'
    ]
  })
</script>