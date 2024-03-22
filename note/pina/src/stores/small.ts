

import { ref } from 'vue'
import { defineStore } from '../small'


export const store1 = defineStore({
  id: 'store1',
  state() {
    return {
      num: 10
    }
  },
  getters: {
    double: (state: { num: number }) => state.num * 2,
    doubleCount: (state: { num: number }) => state.num * 2
  },
  actions: {
    increment() {
      this.num++
    },
    subtract() {
      this.num--
    },
    async promise() {
      this.num = this.num ** 2
    }
  }
})

export const store2 = defineStore({
  id: 'store2',
  state: () => ({
    num: 20
  }),
  getters: {
    double: (state: { num: number }) => state.num * 2
  },
  actions: {
    increment: () => this.num++,
    subtract: () => this.num--,
  }
})


export const store3 = defineStore('store3', () => {
  const num = ref(30)

  const double = () => num.value * 2

  const increment = () => num.value++

  const subtract = () => num.value--

  const promise = async () => num.value = num.value ** 2

  return {
    num,
    double,
    increment,
    subtract,
    promise
  }
})
