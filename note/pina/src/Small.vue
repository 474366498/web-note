<template>
  <div>small</div>
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { store1 ,store2,store3 } from './stores/small' 


export default defineComponent({
  name: 'small',
  setup() {
    const useStore1 = store1()
    // const useStore2 = store2() 
    const useStore3 = store3() 
    console.log('useStore1',useStore1 )
    // console.log('useStore2' , useStore2)
    console.log('useStore3' , useStore3)

    onMounted(() => {
      
    })

    useStore3.$onAction(({ 
      name, 
      store,
      args,
      after,
      onError
    }) => {
      const d = Date.now() 
      console.log('action', d) 
      after(res => {
        console.log(name, store, 'action after', res)
        if (res instanceof Promise) {
          res.then(v => {
            console.log(38,v)
          })
        }
      })
      onError(err => {
        console.error(name,store,'action after',err)
      })
    })
    
    setTimeout(() => {
      // console.log(24, useStore1)
      /*
      useStore1.$patch({
        num : 1e1
      })
      useStore1.$patch(state => {
        console.log(29, state)
        state.num += 10
      })

      useStore1.$reset()
      */
      /*
        useStore1.$subscribe(function ({ storeId},state) {
          console.log(35,storeId,state)
        })
        useStore1.increment()
      */
      /* onAction *
      useStore1.increment()
      useStore3.increment()
      useStore3.promise()
      console.log(useStore1,useStore3)
      */

      /* $state
     useStore3.$state = {num : 10 , count : 1e2}
      console.log(useStore3.$state)
      */


      
    }, 5e3);

    return {

    }
  },

})
</script>