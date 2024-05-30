![文章来源](https://mp.weixin.qq.com/s/R1fFX5MBgNbiL1gxXzCthQ)

![普通setTimeout时差.png](https://mmbiz.qpic.cn/sz_mmbiz_gif/Ptef09iaEWxyia0qky57TjZ1T0iaUushke8YSEYhOEdU3uPAwSXicib83oNloV139F6uMbNXcCjbvwLlce3PNH4Rx1g/640?wx_fmt=gif&wxfrom=13&wx_lazy=1&wx_co=1)

``` typescript 
var form = ref({
  ideal: 0 ,
  real : 0 ,
  diff : 0
})

var t 

function timer () {
  var speed = 50 ,
  counter =1 ,
  start = new Date().getTime() 

  function instance () {
    var ideal = (counter * speed) ,
    real = (new Date().getTime() - start) 

    counter ++ 
    form.ideal.value = ideal // 记录理想值
    form.real.value = real // 记录真实值

    var diff = (real - ideal) 
    form.diff.value = diff 
    
    if(diff >= 1e2 || counter >= 1e2) {  // 防止一直跑
      clearTimeout(t)
    }else {
      // t = window.setTimeout(instance,speed)
      t = window.setTimeout(instance,speed - diff) // 通过系统时间进行修复
    }
  }

  window.setTimeout(instance,speed)

}

timer()

```


![setTimeout倒计时](https://mp.weixin.qq.com/s/cQoCi-UdxZwv7y-VcLi5pg)
![performance api](https://cloud.tencent.com/developer/article/2321362)
*** Performance API 提供了「访问和测量浏览器性能相关信息」的方法。通过 Performance API，开发人员可以获取关于「页面加载时间」、「资源加载性能」、「用户交互延迟」等方面的详细信息，以便进行性能分析和优化。 *** 
``` typescript 
// react 

const useCountDown = ({leftTime,ms=1e3,onEnd}) => {

  const countdownTimer = useRef() ,
    startTimer = useRef() 
  // 记录初始时间
  const startTimeRef = useRef(performance.now()) 
  // 第一次执行的时间处理 让下一次倒计时时调整为整数
  const nextTimeRef = useRef(leftTime % ms) 

  const [count ,setCount ] = useState(leftTime) 

  const clearTimer = () => {
    countdownTimer.current && clearTimeout(countdownTimer.current) 
    startTimer.current && clearTimeout(startTimer.current)
  }

  const startCountDown = () => {
    clearTimer()
    const currentTime = performance.now()

    // 算出每次实际执行的时间
    const executionTime = currentTime - startTimeRef.current 

    // 实际执行时间大于上一次需要执行的时间，说明执行时间多了，否则需要补上差的时间
    const diffTime = executionTime > nextTimeRef.current 
                    ? executionTime - nextTimeRef.current 
                    : nextTimeRef.current - executionTime 
    
    setCount((count)=>{
      const nextCount = count - (Math.floor(executionTime / ms)||1) * ms - diffTime  // 应该有问题
      return nextCount <= 0 ?0 :nextCount 
    })

    // 算出下一次的时间
    nextTimeRef.current = executionTime > nextTimeRef.current ? ms - diffTime : ms + diffTime 

    // 重置初始化时间
    startTimeRef.current = performance.now() 

    countdownTime.current = setTimeout(()=>{
      requestAnimationFrame(startCountDown)
    },nextTimeRef.current)

  }

  useEffect(()=>{
    setCount(leftTime)
    startTimer.current = setTimeout(startCountDown,nextTimeRef.current) 
    return () => {
      clearTimer()
    }
  },[leftTime])

  useEffect(() => {
    if(count <= 0) {
      clearTimer()
      onEnd && onEnd()
    }
  },[count])

  return count 
}

export default useCountDown

```