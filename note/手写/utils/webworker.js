// for.worker.js 
// 1.监听主线程消息
self.onmessage = e => {
  // 2.接收来自主线程发送过来的数据
  console.log(4, e, self)
  console.time()
  const data = e.data;
  let sum = data
  for (let i = 1; i < 1e5; i++) {
    for (let j = 1; j < 1e4; j++) {
      sum = sum + i + j
    }
    // sum += i
  }
  console.log(12, sum)
  console.timeEnd()
  // 3.将结果发送给主线程
  self.postMessage({ sum });
};

// 4.在worke 线程中也可以监听错误信息
self.onerror = e => {
  console.log(e);
};

// 5.worker线程也可以调用close结束worker线程
// self.close();



// vue 中调用 for.worker.js

import FroWorker from 'for.worker.js'

// 这里的worker.js 是放在dist打包生成后与index.html同级的位置
const onCodeFn = () => {
  const codeWrapperFun = () => {
    console.log('12 3' + '\n' + '45 6');
  };
  const codeString = codeWrapperFun.toString().slice(7, -1);
  const worker = new Worker(`data:application/javascript, ${codeString}`)
  console.log(worker)
  worker.onmessage = function (event) {
    console.log('message')
  }
  worker.onerror = function (params) {
    console.log(18, 'worker toString data:application/javascript error')
  }

  var work = new Worker('worker.js')
  work.postMessage('work com')
  work.onmessage = function (e) {
    console.log(51, e)
  }
}

const onPackage = () => {
  let worker = null
  if (window.Worker) {
    console.time()
    worker = new ForWorker()
    console.log(74, worker)
    let params = 100
    worker.postMessage(params)

    worker.onmessage = function (e) {
      console.log(76, e)
      console.timeEnd()
      worker && worker.terminate()
    }
    worker.onerror = function (error) {
      console.log(error)
      console.timeEnd()
      worker && worker.terminate()
    }
  } else {
    console.log('window is not found worker')
  }
}

const onFiles = () => {
  let worker = new Worker(
    new URL('./for.worker.js', import.meta.url),
    {
      type: 'module'
    }
  )
  console.log(94, worker)
  worker.postMessage({
    title: 'worker',
    msg: '发送消息了'
  })
  worker.onmessage = function (e) {
    console.log('接收消息了')
  }
  worker.onerror = function (e) {
    console.log('接收错误')
  }

}



// web worker 实现下载 start
// https://mp.weixin.qq.com/s/Mpe7vxdeWlXQI3Jl5VYqSw
// fileWorker.js 
onmessage = function (event) {
  const file = event.data

  // 执行下载
  fetch(file.url)
    .then(res => res.blob())
    .then(blob => {
      postMessage(blob)
    })
}

// 主线程
const worker = new Worker('fileWorker.js')
worker.postMessage(file)
worker.onmessage = function downFile(event) {
  console.log('处理下载')
}

// web worker 实现下载 end 

