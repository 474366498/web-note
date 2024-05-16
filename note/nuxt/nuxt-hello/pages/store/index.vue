<template>
  <section>
  <h4>状态管理器</h4>
  <div>
    <button @click="()=>counter--">-</button>
    计数器:{{ counter  }}
    <button @click="()=>counter++">+</button>
  </div>
  <div >
    <h4>nuxt </h4>
    <p>{{ date }}</p>
    <label fro="locale-chooser"> 预览不同的语言环境 </label>
    <select id="locale-chooser" v-model="locale" style="background-color: transparent;">
       <option v-for="locale of locales" :key="locale" :value="locale" style="background-color: aqua;">
        {{ locale }}
      </option>
    </select>
  </div>

  </section>
</template>


<script setup lang="ts">
const counter = useState('counter',()=>Math.round(Math.random()*1e3))

const locales = useLocales(),
  locale = useLocale(),
  date = useLocalDate(new Date())
console.log(30,locales , locale , date)
</script>