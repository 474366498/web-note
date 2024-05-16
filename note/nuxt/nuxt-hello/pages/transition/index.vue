<template>
  <div> transition </div>
</template>

<script setup lang="ts" >
console.log(777)
definePageMeta({
  pageTransition: {
    name: 'custom-flip',
    mode: 'out-in',
    onBeforeEnter: el => {
      console.log('transition page before enter' , el)
    },
    onEnter: (el, done) => {
      console.log('transition page enter' , el,done)
    },
    onAfterEnter: el => {
      console.log('transition page after enter' , el)
    }
  },
  layoutTransition: {
    name: 'custom-flip',
    mode: 'out-in',
    onBeforeEnter: el => {
      console.log('transition layout before enter' , el)
    },
    onEnter: (el, done) => {
      console.log('transition layout enter' , el,done)
    },
    onAfterEnter: el => {
      console.log('transition layout after enter' , el)
    }
  }
})

</script>