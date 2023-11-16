<template>
    <section id="screen">
      <div class="header">智慧城市</div>
      <div class="main">
        <div class="left">
          <div class="cityEvent" v-for="(item,key) in dataInfo" key="key">
            <h3> <span>{{ item.name }}</span></h3>
            <h1>
              <img src="../assets/bg/bar.svg" class="icon" /> 
              <span> {{ toFixInt(item.number) }} ({{ item.unit }})</span>
            </h1>
          </div>

        </div>

        <div class="right">
          <div class="cityEvent list">
            <h3> <span> 事件列表</span></h3>
            <ul>
              <li v-for="(item , i ) of eventList.list" key="i" :class="{active:currentActive == i}">
                <h1> 
                  <div> 
                    <img class="icon" :src="imgs[item.name]" /> 
                    <span>{{ item.name }}</span>
                  </div>
                  <span class="time">{{ item.time.slice(10,item.time.length ) }}</span>
                </h1>
                <p>{{ item.type }}</p>
                <address style="color:yellow;">x:{{ item.position.x }} , y : {{ item.position.y }}</address>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, reactive, ref } from 'vue'

import { getCityInfo, getCityList } from '@/api'

const imgs = {
  电力: require("@/assets/bg/dianli.svg"),
  火警: require("@/assets/bg/fire.svg"),
  治安: require("@/assets/bg/jingcha.svg"),
  急救: require("@/assets/bg/jijiu1.svg"),
};
var dataInfo = reactive({
  iot : { number : 0 } ,
  event : { number : 0 } ,
  power : { number : 0 } ,
  test : { number : 0 } ,
}),
  eventList = reactive({list:[]}) 
const currentActive = ref(null) 

onMounted(async () => {
  changeInfo()
  changeList()
  setInterval(() => {
    changeInfo()
    changeList()
  }, 1e4);
})

const changeInfo = async () => {
  const res = await getCityInfo() 
  // console.log(27, res.data)
  let data = res.data.data
  for (let key in dataInfo) {
    dataInfo[key].name = data[key].name
    dataInfo[key].unit = data[key].unit
    gsap.to(dataInfo[key], {
      number: data[key].number,
      duration : 1
    })
  }

}

const changeList = async () => {
  let res = await getCityList() 
  eventList.list = res.data.list
  // console.log(80,res.data , eventList)
}

const  toFixInt = num => {
  return num.toFixed(0)
}
</script>

<style scoped> 
#screen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;

  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}

.header {
  /* width: 1920px;
        height: 100px; */

  width: 19.2rem;
  height: 1rem;
  background-image: url(@/assets/bg/title.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}

.main {
  flex: 1;
  width: 19.2rem;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 4rem;
  min-width:240px;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.right {
  width: 4rem;
  min-width:240px;

  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.cityEvent {
  position: relative;
  width: 3.5rem;
  min-width:200px;
  /* height: 3rem; */
  margin-bottom: 0.5rem;
  background-image: url(@/assets/bg/bg_img03.png);
  background-repeat: repeat;
}

.cityEvent::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.cityEvent::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}
.footerBorder {
  position: absolute;
  bottom: 0;
  bottom: 0;
  width: 3.5rem;
  height: 0.4rem;
}
.footerBorder::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.footerBorder::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0.3rem;
  justify-content: space-between;
  font-size: 0.3rem;
}
h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem;
}

h1 > div {
  display: flex;
  align-items: center;
}
h1 span.time {
  font-size: 0.2rem;
  font-weight: normal;
}

.cityEvent li > p {
  color: #eee;
  padding: 0rem 0.3rem 0.3rem;
}
.list h1 {
  padding: 0.1rem 0.3rem;
}
.cityEvent.list ul {
  pointer-events: auto;
  cursor: pointer;
}

.cityEvent li.active h1 {
  color: red;
}
.cityEvent li.active p {
  color: red;
}

ul,
li {
  list-style: none;
}
</style>