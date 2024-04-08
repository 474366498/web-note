
# 你也许不需要 jQuery （You (Might) Don't Need jQuery）![github](https://github.com/camsong/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)

## query 选择器
常用的class id 属性选择器都可以用document.querySelector 或document.querySelectorAll 替代 区别是
  1. document.querySelector 返回第一个匹配的Element 
  2. document.querySelectorAll 返回所有匹配的Element组成的NodeList 它可以通过[].slice.call()反它转成Array 
  3. 如果 匹配不到任何Element,jquery返回空数组[] ， 但document.querySelect返回null ,注意空指针异常。 当找不到时，也可以使用||设置默认的值，如document.querySelectorAll(selector)||[] 
  > document.querySelector 和 document.querySelectorAll 性能很差。如果想提高性能，尽量使用 document.getElementById、document.getElementsByClassName 或 document.getElementsByTagName。

    + 1.0 选择器查询

    ```javascript
    // jquery
    $('selector')

    //Native 
    document.querySelectorAll('selector')
    ```
    + 1.1 class查询 

    ``` javascript 
    // jquery 
    $('.class')

    // Native 
    document.querySelectorAll('.class')
    // or 
    document.getElementsByClassName('class')

    ```

    + 1.2 id查询

    ``` javascript 
    // jquery 
    $('#id')

    // Native 
    document.querySelector('#id')
    // or
    document.getElementById('id')
    // or
    window['id']
    ```

    + 1.3 属性查询

    ``` javascript 
    // jquery
    $('a[target=_blank]')
    
    // Native 
    document.querySelectorAll('a[target=_blank]') 

    ```
    + 1.4 后代查询 

    ``` javascript 
    // jquery 
    $el.find('li')

    // Native 
    el.querySelectorAll('li')

    ```

    + 1.5 兄弟以及上下元素

      + 兄弟元素

        ``` javascript 
        // jquery 
        $el.siblings() 

        // Native - latest edge13+
        [...el.parentNode.children].filter(child=>child !== el)

        // Native (alternative) latest edge13+ 
        Array.from(el.parentNode.children).filter(child=>child !== el)

        // Native ie10+ 
        Array.prototype.filter(el.parentNode.children,child=>child !== el)

        ```
      + 上一个元素

        ``` javascript 
          // jquery 
          $el.prev() 

          // Native 
          el.previousElementSibling

        ```

      + 下一个元素

      ``` javascript 
          // jquery 
          $el.next() 

          // Native 
          el.nextElementSibling

        ```

    + 1.6 Closest
    Closest 获得匹配选择器的第一个祖先元素，从当前元素开始沿dom树向上 ![jquery closest api](https://jquery.cuishifeng.cn/closest.html)

    ``` javascript  
      // jquery 
      $el.closest(queryString) 

      // Native only latest no ie 
      el.closest(selector) 

      // Native ie10+ 
      function closest(el,selector) {
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector 

        while(el) {
          if(matchesSelector.call(el,selector)) {
            return el
          }else {
            el = el.parentElement
          }
        }
        return null 
      }


    ``` 
    + 1.7 Parents Until 
    获取当前每一个匹配元素集的祖先，不包括匹配元素本身 ![jquery parentsUntil api](https://jquery.cuishifeng.cn/parentsUntil.html)

    ``` javascript 
    // jquery 
    $el.parentsUntil(selector,filter) 

    // Native 
    function parentsUntil(el,selector,filter) {
      const result = [] 
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector 

      el = el.parentElement 
      while(el && !matchesSelector.call(el,selector)) {
        if(!filter) {
          result.push(el)
        }else {
          if(matchesSelector.call(el,filter)) {
            result.push(el)
          }
        }
        el = el.parentElement
      }
      return result 
    }

    ```
    + 1.8 Form 

      + input/Textarea 

      ``` javascript 
      // jquery 
      $('#my-input').val() 

      // Native 
      document.querySelector('#my-input').value

      ```
      + 获取e.currentTarget 在.radio中的数组索引

      ``` javascript 
      // jquery 
      $('.radio').index(e.currentTarget)

      // Native 
      Array.prototype.indexOf.call(document.querySelectorAll('.radio'),e.currentTarget)


      ```

    + 1.9 Iframe Contents 
    jquery 对象的iframe contents() 返回的是iframe内的document 

      + iframe contents 
      ``` javascript 
        // jquery 
        $iframe.contents() 

        // Native 
        iframe.contentDocument

      ```

      + iframe query 
      ``` javascript 
        // jquery 
        $iframe.contents().find('.css') 
        
        // Native 
        iframe.contentDocument.querySelectorAll('.css')

      ```

    + 1.10 获取 body 

    ``` javascript 
      // jquery 
      $('body') 

      // Native 
      document.body 

    ``` 

    + 1.11 获取或设置属性 

      + 获取属性
      ``` javascript 
        //jquery 
        $el.attr('foo')

        // Native 
        el.getAttribute('foo')
      ``` 
      + 设置属性
      ``` javascript 
        // jquery 
        $el.attr('foo','bar') 

        // Native 
        el.setAttribute('foo','bar')

      ``` 
      + 获取自定义属性
      ``` javascript 
        // jquery 
        $el.data('foo')

        // Native (use `getAttribute`)
        el.getAttribute('data-foo') 

        // Native (use `dataset` if only need to support IE 11 + ) 
        el.dataset('foo')
      ``` 
## CSS & Style 
  + 2.1 CSS

    + get style 
    ``` javascript 
      // jquery 
      $el.css('color')

      // Native 
      // 注意 此处为了解决当style值为auto时 返回auto的问题 
      const win = el.ownerDocument.defaultView 

      // null的意思是不返回伪类元素 
      win.getComputedStyle(el,null).color

    ```

    + set style 
    ``` javascript 
      // jquery 
      $el.css({color:'red'})

      // Native 
      el.style.color = 'red'

    ```

    + get set styles 
    注意 如果想一次设置多个style 可以参考oui-dom-utils中 ![setStyles](https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L194) 方法

    + add class 
    ``` javascript 
      // jquery 
      $el.addClass(className)

      // Native 
      el.classList.add(className)

    ```

    + remove class 
    ``` javascript 
      // jquery 
      $el.removeClass(className)

      // Native 
      el.classList.remove(className)

    ```

    + has class 

    ``` javascript 
      // jquery 
      $el.hasClass(className)

      // Native 
      el.classList.contains(className)

    ```
    + toggle class 
    ``` javascript 
      // jquery 
      $el.toggleClass(className)

      // Native 
      el.classList.toggle(className)

    ```

  + 2.2 width & height 
    width 与 height 获取方法相同 
    + window height 
    ``` javascript 
      // jquery window height 
      $(window).height() 

      // 不含 scrollbar 与 jquery 行为一致
      window.document.documentElement.clientHeight 

      // 含 scrollbar 
      window.innerHeight 

    ```
    + document height 
    ``` javascript 
      // jquery 
      $(document).height()

      // Native 
      const body = document.body 
      const html = document.documentElement 
      const height = Math.max(
        body.offsetHeight ,
        body.scrollHeight ,
        html.clientHeight ,
        html.offsetHeight ,
        html.scrollHeight 
      )

    ```
    + element height 
    ``` javascript 
      // jquery 
      $el.height() 

      // Native 
      function getHeight (el) {
        const styles = this.getComputedStyle(el) 
        const height = el.offsetHeight 
        const borderTopWidth = parseFloat(styles.borderTopWidth)
        const borderBottomWidth = parseFloat(styles.borderBottomWidth)
        const paddingTop = parseFloat(styles.paddingTop)
        const paddingBottom = parseFloat(styles.paddingBottom)
        return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom

      }
      // 精确到整数（border-box 时为 height - border 值，content-box 时为 height + padding 值）
      el.clientHeight
      // 精确到小数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
      el.getBoundingClientRect().height
    ```

  + 2.3 position & offset 

    + position 
    获取匹配元素相对父元素的偏移
    ``` javascript 
      // jquery 
      $el.position() 

      // Native 
      { left : el.offsetLeft , top : el.offsetTop} 

    ```

    + offset 
    获取匹配元素相对文档的偏移
    ``` javascript 
      // jquery 
      $el.offset() 

      // Native 
      function getOffset(el) {
        const box = el.getBoundingClientRect() 
        return {
          top : box.top + window.pageYOffset - document.documentElement.clientTop ,
          left : box.left + window.pageXOffset - document.documentElement.clientLeft
        }
      }

    ```

  + 2.4 scroll top 
  获取元素滚动条垂直位置
  ``` javascript 
    // jquery 
    $(window).scrollTop()

    // Native 
    (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop 

  ```

## DOM 操作

  + 3.1 remove 
  ``` javascript 
    // jquery 
    $el.remove() 

    // Native 
    el.parentNode.removeChild(el) 

    // Native - only latest NO IE 
    el.remove()

  ```
  + 3.2 text 
    + get Text 
    返回指定元素及其后代的文本内容
    ``` javascript 
      // jquery 
      $el.text() 

      // Native 
      el.textContent 

    ```
    + set Text 
    设置元素的文本内容
    ``` javascript 
      // jquery 
      $el.text(string)

      // Native 
      el.textContent = string 

    ```
  + 3.3 html 
   + get html  
    ``` javascript 
      // jquery 
      $el.html() 

      // Native 
      el.innerHTML 

    ```
    + set html  
    ``` javascript 
      // jquery 
      $el.html(htmlString)

      // Native 
      el.innerHTML = htmlString 

    ```
  + 3.4 append 
  Append插入到子节点的末尾
  ``` javascript 
    // jquery 
    $el.append("<div id='container'></div>")

    // Native (html string) 
    el.insertAdjacentHTML('beforeend',"<div id='container'></div>")

    // Native (element)
    el.appendChild(newEl)
  ```
  + 3.5 prepend 
  ``` javascript 
    // jquery 
    $el.prepend("<div id='container'>Hello</div>")

    // Native (html string)
    el.insertAdjacentHTML('afterbegin',"<div id='container'>Hello</div>")

    // Native (element)
    el.insertBefore(newEl,el.firstChild) 
  ```
  + 3.6 insertBefore 
  在选中元素前插入新节点 
  ``` javascript 
    // jquery 
    $newEl.insertBefore(queryString) 

    // Native (html string) 
    el.insertAdjacentHTML('beforebegin',"<div id='container'>Hello</div>")

    // Native (element) 
    const el = document.querySelector(selector) 
    if(el.parentNode){
      el.parentNode.insertBefore(newEL,el)
    }

  ```
  + 3.7 insertAfter 
  在选中元素后插入新节点
   ``` javascript 
    // jquery 
    $newEl.insertAfter(queryString) 

    // Native (html string)
    el.insertAdjacentHTML('afterend',"<div id='container'>Hello</div>")

    // Native (element)
    const el = document.querySelector(selector) 
    if(el.parentNode) {
      el.parentNode.insertBefore(newEl,el.nextSibling)
    }

   ```
  + 3.8 is
  如果匹配给定的选择器返回true
  ``` javascript 
    // jquery 
    $el.is(selector)

    // Native 
    el.matches(selector)

  ```

  + 3.9 clone 
  深拷贝被选中元素 （生成被选元素的副本 包含子节点、文本、属性）
  ``` javascript 
    // jquery 
    $el.clone() 

    // Native 
    el.cloneNode()

  ```
  + 3.10 empty 
  移除所有子节点
  ``` javascript 
    // jquery 
    $el.empty()

    // Native 
    el.innerHTML = ''
  ```
  + 3.11 wrap 
  把每个被选元素放置在指定的HTML结构中

  ``` javascript 
    // jquery 
    $('.inner').wrap("<div class='wrapper'></div>")

    // Native 
    Array.from(document.querySelectorAll('.inner')).forEach(el=>{
      const wrapper = document.createElement('div')
      wrapper.className ='wrapper' 
      el.parentNode.insertBefore(wrapper,el) 
      el.parentNode.removeChild(el) 
      wrapper.appendChild(el)
    })
  ``` 
  + 3.12 unwrap 
  移除被选中元素的父元素的DOM结构 
  ``` javascript 
    // jquery 
    $('.inner').unwrap() 

    // Native 
    Array.prototype.forEach.call(document.querySelectorAll('.inner'),el=>{
      let elParentNode = el.parentNode 
      if(elParentNode !== document.body) {
        elParentNode.parentNode.insertBefore(el,elParentNode) 
        elParentNode.parentNode.removeChild(elParentNode)
      }
    })

  ```
  + 3.13 replaceWith 
  用指定的元素替换被选的元素 
  ``` javascript 
    // jquery 
    $('.inner').replaceWith("<div class='outer'></div>")

    // Native 
    Array.prototype.forEach.call(document.querySelectorAll('.inner'),el=>{
      const outer = document.createElement('div')
      outer.className = 'outer'
      el.parentNode.insertBefore(outer,el)
      el.parentNode.removeChild(el)
    })

  ```
  + 3.14 simple parse 
  解析 HTML/SVG/XML字符串 ![createContextualFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/createContextualFragment)
  ``` javascript 
    // jquery 
    $(`<ol>
      <li>a</li>
      <li>b</li>
      </ol>
      <ol>
      <li>c</li>
      <li>d</li>
      </ol>
    `)

    // Native 
    range = document.createRange() 
    parse = range.createContextualFragment.bind(range) 

    parse(`<ol>
      <li>a</li>
      <li>b</li>
    </ol>
    <ol>
      <li>c</li>
      <li>d</li>
    </ol>`);


  ```

## Ajax 
  ![Fetch API](https://fetch.spec.whatwg.org/)是用于替换XMLHttpRequest 处理ajax的新标准 ，chrome firefox 均支持 旧浏览器可以使用polyfills提供支持 IE9+ 使用 ![github/fetch](http://github.com/github/fetch) IE8 使用 ![fetch-ie8](https://github.com/camsong/fetch-ie8/) JSONP使用 ![fetch-jsonp](https://github.com/camsong/fetch-jsonp)
  ``` javascript 
    // jquery 
    $(selector).load(url,completeCallback) 

    // Native 
    fetch(url)
    .then(data=>data.text())
    .then(data=>{
      document.querySelector(selector).innerHTML = data
    })
    .then(completeCallback)

  ```
## 事件
  完整的替代命名空间和事件代理 链接到 ![https://github.com/oneuijs/oui-dom-events](https://github.com/oneuijs/oui-dom-events)

  + 5.1 Document ready by DOMContentLoaded 
  ``` javascript 
    // jquery 
    $(document).ready(eventHandler)

    // Native 
    // 检测DOMContentLoaded是否已完成
    if(document.readyState !== 'loading') {
      eventHandler()
    }else {
      document.addEventListener('DOMContentLoaded',eventHandler)
    }

  ``` 
  + 5.2 使用on绑定事件
  ``` javascript 
    // jquery 
    $el.on(eventName,eventHandler)

    // Native 
    el.addEventListener(eventName,eventHandler)

  ```
  + 5.3 使用off解绑事件
  ``` javascript 
    // jquery 
    $el.off(eventName,eventHandler) 

    // Native 
    el.removeEventListener(eventName,eventHandler)

  ```
  + 5.4 trigger ![customEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent)
  ``` javascript 
    // jquery 
    $(el).trigger('custom-event',{key:'data'})

    // Native 
    if(window.CustomEvent) {
      const event = new CustomEvent('custom-event',{detail:{key:'data'}})
    }else {
      const event = document.createEvent('CustomEvent')
      event.initCustomEvent('custom-event',true,true,{key:'data'})
    }
    el.dispatchEvent(event)

  ```
  
## 实用工具
大部分实用工具都能在native API中找到 其它高级功能可以选用专注于该领域的稳定性和性能都能更好的库来代替 如![lodash](https://lodash.com/)
  + 6.1 基本工具
    + isArray  
    ``` javascript 
      // jquery 
      $.isArray(range)

      // Native 
      Array.isArray(range)
    ``` 
    + isWindow 
    ``` javascript 
      // jquery 
      $.isWindow(obj) 

      // Native 
      function isWindow(obj) {
        return obj !== null && obj !== undefined && obj === obj.window 
      }

    ```
    + inArray 
    ``` javascript 
      // jquery 
      $.inArray(item,array) 

      // Native 
      array.indexOf(item) > -1 

      // Native es6 
      array.includes(item) 

    ```
    + isNumeric 
    ``` javascript 
      // jquery 
      $.isNumeric(item) 

      // Native 
      function isNumeric (val) {
        return !isNaN(parseFloat(val)) && isFinite(val)
      }

    ```
    + isFunction 
    ``` javascript 
      // jquery 
      $.isFunction(item) 

      // Native 
      function isFunction (item) {
        if(typeof item === 'function'){
          return true 
        }
        var type = Object.prototype.toString(item) 
        return type === '[object Function]' || type === '[object GeneratorFunction]'
      }

    ```
    + isEmptyObject 
    ``` javascript 
      // jquery 
      $.isEmptyObject(obj)

      // Native 
      function isEmptyObject(obj) {
        return Object.keys(obj).length === 0 
      }
    ```
    + isPlainObject 
    检测是不是扁平对象(作用‘{}’或"new Object"创建) 
    ``` javascript 
      // jquery 
      $.isPlainObject(obj) 

      // Native 
      function isPlainObject(obj) {
        if(typeof obj !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
          return false 
        }
        if(obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype,'isPrototypeOf')) {
          return false 
        } 
        return true
      }

    ```
    + extend 
    ``` javascript 
      // jquery 
      $.extend({},defaultOpts,opts) 

      // Native 
      Object.assign({},defaultOpts,opts)

    ```
    + trim 
    ``` javascript
      // jquery 
      $.trim(string) 

      //Native 
      string.trim()

    ```

    + map 
    ``` javascript 
      // jquery 
      $.map(array,(val,index) => {

      })

      // Native 
      array.map((val,index)=>{

      })

    ```
    + each 
    ``` javascript 
      // jquery 
      $.each(array,(index,val) => {

      })

      // Native 
      array.each((val,index)=>{

      })
    ```
    + grep 
    ``` javascript 
      // jquery 
      $.grep(array,(val,index) => {

      })

      // Native
      array.filter((val,i)=>{

      })

    ```

    + type 
    检测对象的 javascript[class]内部类型 

    ``` javascript 
      // jquery
      $.type(obj)

      // Native 
      function type(item) {
        const reTypeOf = /(?:^\[object\s(.*?)\]$)/
        return Object.prototype.toString.call(item)
          .replace(reTypeOf,'$1')
          .toLowerCase() 
      }

    ```
    + merge 
    ``` javascript 
      // jquery 
      $.merge(array1,array2) 

      //Native 
      function merge(...args) {
        return [].concat(...args)
      }

      // ES6 
      array = [...array1,...array2]

      // set 去重
      function merge(...args){

       return  Array.from(new Set([].concat(...args)))
      }

    ```
    + now 
    ``` javascript 
      // jquery 
      $.now()

      // Native 
      Date.now()

    ```
    + proxy 
    传入函数并返回一个新函数 该函数绑定指定上下文
    ``` javascript 
      // jquery 
      $.proxy(fn,context) 

      // Native 
      fn.bind(context)

    ``` 

    + makeArray 
    ``` javascript 
      // jquery 
      $.makeArray(arrayLike)

      // Native 
      Array.prototype.slice.call(arrayLike) 

      // es6 
      Array.from(arrayLike)
    ```

  + 6.2 包含
  ``` javascript 
    // jquery 
    $.contains(el,child)

    // Native 
    el != child && el.contains(child)

  ```

  + 6.3 Globaleval 
  全局执行javascript代码 
  ``` javascript 
    // jquery 
    $.globaleval(code)

    // Native 
    function Globaleval (code) {
      const script = document.createElement('script')
      script.text = code 
      document.head.appendChild(script).parentNode.removeChild(script)
    }
    eval(code)

  ``` 

  + 6.4 解析
    + parseHTML ![document.implementation](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/implementation)
      ``` javascript 
        // jquery 
        $.parseHTML(htmlString) 

        // Native 
        function parseHTML (string) {
          const context = document.implementation.createHTMLDocument() 

          const base = context.createElement('base')
          base.href = document.location.href 
          context.head.appendChild(base) 

          context.body.innerHTML = string 
          return context.body.children
        }

      ```
    + parseJSON
    ``` javascript 
      // jquery 
      $.parseJSON(str) 

      // Native 
      JSON.parse(str)
     
    ```
## Promise 
Promise 代表异步操作的最终结果 jquery用它自己的方式处理 promise 原生 JavaScript 遵循 ![Promises/A+](http://promises-aplus.github.io/promises-spec/) 标准实现了最小 API 来处理 promises。
  + 7.1  done fail always 
  *** done会在promise解决时调用 ， fail会在promise拒绝时调用，always总会调用 *** 
  ``` javascript 
    // jquery 
    $promise.done(doneCallback).fail(failCallback).always(alwaysCallback)

    // Native 
    promise.then(doneCallback,failCallback).then(alwaysCallback , alwaysCallback)

  ``` 
  + 7.when 
  *** when 用于处理多个promise 当全部promise被解决时返回 当任一promise被拒绝时拒绝 *** 
  ``` javascript 
    // jquery 
    $.when(promise1,promise2).done((promise1Result,promise2Result)=>{

    })

    // Native 
    Promise.all([promise1,promise2]).then(([promise1Result,promise2Result]) =>{

    })

  ``` 
  + 7.3 Deferred 
  ``` javascript 
    // jquery 
    function asyncFunc () {
      const defer = new $.Deferred() 
      setTimeout(()=>{
        if(true) {
          defer.resolve('some_value_computed_asynchronously')
        }else {
          defer.reject('failed')
        }
      },1e3)
      return defer.promise()
    }

    // Native 

    function asyncFunc () {
      return new Promise((resolve,reject) => {
        setTimeout(()=>{
         if(true) {
          resolve('some_value_computed_asynchronously')
        }else {
          reject('failed')
        }
        })
      })
    }

    // Deferred way 
    function defer() {
      const deferred = {} 
      const promise = new Promise((resolve,reject) => {
        deferred.resolve = resolve 
        deferred.reject = reject 
      })
      deferred.promise = () => promise 
      return deferred 
    }

    function asyncFunc () {
      const defer = defer() 
      setTimeout(()=>{
        if(true) {
          defer.resolve('some_value_computed_asynchronously')
        }else {
          defer.reject('failed')
        }
      },1e3)
      return defer.promise
    }

  ```

## 动画
  + 8.1 show & hide
  ``` javascript 
    // jquery 
    $el.show() 
    $el.hide() 

    // Native 
    // 更多 show方法的详细详见 https://github.com/oneuijs/oui-dom-utils/blob/master/src/index.js#L363
    el.style.display = '' | 'inline'|'inline-block'|'inline-table'|'block'
    el.style.display = 'none'

  ```
  + 8.2 toggle 
  ``` javascript 
    // jquery 
    $el.toggle() 

    // Native 
    if(el.ownerDocument.defaultView.getComputedStyle(el,null).display ==='none') {
      el.style.display = '' | 'inline'|'inline-block'|'inline-table'|'block'
    }else{
      el.style.display ='none'
    }

  ```
  + 8.3 fadeIn & fadeOut 
  ``` javascript
    // jquery 
    $el.fadeIn(3e3)
    $el.fadeOut(3e3) 

    // Native 
    el.style.transition = 'opacity 3s' 
    // fadeIn 
    el.style.opacity = '1' 
    // fadeOut 
    el.style.opacity = '0'

  ```
  + 8.4 fadeTo 
  ``` javascript 
    // jquery 
    $el.fadeTo('slow',.5) 

    // Native 
    el.style.transition = 'opacity 3s' // 假设 'slow' 等于3秒
    el.style.opacity = '.15' 

  ```
  + 8.5 fadeToggle 
  动画调整透明度来显示或隐藏
  ``` javascript 
    // jquery 
    $el.fadeToggle() 

    // Native 
    el.style.transition = 'opacity 3s' 
    const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el,null) 
    if(opacity ==='1') {
      el.style.opacity = '0'
    }else {
      el.style.opacity = '1' 
    }

  ```
  + 8.6 sideUp & sideDown 
  ``` javascript 
    // jquery 
    $el.sideUp()
    $el.sideDown()

    // Native 
    const originHeight = '100px' 
    el.style.transition = 'height 3s' 
    // sideUp 
    el.style.height = '0px' 
    // sideDown 
    el.style.height = originHeight 


  ```
  + 8.7 sideToggle 
  滑动切换显示或隐藏
  ``` javascript 
    // jquery 
    $el.sideToggle() 

    // Native 
    const originHeight = '100px' 
    el.style.transition = 'height 3s' 
    const {height} = el.ownerDocument.defaultView.getComputedStyle(el,null) 
    if(parseInt(height,10) === 0) {
      el.style.height = originHeight 
    }else{
      el.style.height ='0px'
    }


  ```  
  + 8.8 animate 
  ``` javascript 
    // jquery 
    $el.animate({params},speed) 

    // Native 
    el.style.transition = 'all ' + speed 
    Object.keys(params).forEach(key=>{
      el.style[key] = params[key]
    })

  ``` 

## 替代器
  + ![你可能不需要 jQuery (You Might Not Need jQuery) ](http://youmightnotneedjquery.com/) - 如何使用原生javascript实现通用事件、元素、ajax等用法
  + ![npm-dom](http://github.com/npm-dom)以及![webmodules](http://github.com/webmodules) - 在NPM上提供独立DOM模块的组织 
  + 9.1 
## 浏览器支持 
|:----:| :-----: | :-----:|:------:|:-----:|
| chrome| firefox |  ie   |  opera |safari |
| latest| latest | 10+    | latest | latest |


 *** chrome latest *** 
 *** firefox latest *** 
 *** ie 10+ *** 
 *** opera latest *** 
 *** safari latest *** 


    
