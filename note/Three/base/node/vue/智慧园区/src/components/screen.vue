<template>
    <section id="screen">
      <div class="header">智慧园区</div>
      <div class="main">
        <div class="left">
          <div class="cityEvent" >
            <h3> <span>热气球运动轨迹</span></h3>
            <h1>
              <label>
                横穿
                <input name="motionTrajectory" type="radio" value="0" @change="toggleAction(0)"/>
              </label>
              <label>
                环绕
                <input name="motionTrajectory" type="radio" value="1" @change="toggleAction(1)"/>
              </label>
            </h1>
            <div class="footerBorder"></div>
          </div>
          <div class="cityEvent">
            <h3><span>相机切换</span></h3>
            <h1><label> 默认<input name="camera" type="radio" value="" @change="toggleCamera('default')"></label></h1>
            <h1><label> 车后方<input name="camera" type="radio" value="" @change="toggleCamera('carcamera_Orientation')"></label></h1>
            <h1><label>驾驶员右侧 <input name="camera" type="radio" value="" @change="toggleCamera('rightcamera_Orientation')"></label></h1>
            <div class="footerBorder"></div>

          </div>

          <div class="cityEvent">
            <h3><span>控制器切换</span></h3>
            <h1><label> 默认<input name="camera" type="radio" value="" @change="toggleControls('orbit')"></label></h1>

            <h1><label>第一人物视觉 <input name="camera" type="radio" value="" @change="toggleControls('person')"></label></h1>
            <h1><label> 飞行模式<input name="camera" type="radio" value="" @change="toggleControls('fly')"></label></h1>
            <div class="footerBorder"></div>

          </div>

        </div>

        <!-- <div class="right">
          <div class="cityEvent list">
            <h3> <span> 事件列表</span></h3>
            <ul>
               
            </ul>
          </div>
        </div> -->

      </div>
    </section>
</template>

<script setup>
import * as T from 'three'
import gsap from 'gsap'
import { onMounted, reactive, ref, watch } from 'vue'

import eventHub from '@/utils/eventHub'

console.log(54,eventHub)
 

const toggleAction = e => {
  console.log(50, e)
  eventHub.emit('toggleAction',e)
}, toggleCamera = key => {
  console.log(68, key) 
  eventHub.emit('toggleCamera',key)
  }, toggleControls = key => {
    console.log('toggleControls', key)
  eventHub.emit('toggleControls',key)
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
  pointer-events: auto;
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
  min-width:200px;
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
h1 label{
  cursor:pointer;
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
  cursor:pointer;
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