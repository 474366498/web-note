let arr = [1, 2, 3, 4]
let s = new Set([...arr])
let { log, error, warning } = console
// console.log(s.entries())
// console.log(arr)

// console.log(Math.floor(5 / 2))

// const urlReg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+/

// console.log(urlReg.test('http://www.hljggzyjyw.org.cn/jyfwdt/003002/003002001/003002001006/20221103/1a7ec302-398d-4565-96dc-8b497396270c.html'))


// let h = `高铁片区组团住宅项目[DC*！@#￥%……&（）!@#$%^&*()-L08-05（b)/DC-L-08-06(a)、DC-L-08-06(b)地块】全过程造价咨询服务含施工图工程量清单及控制价编制）`
// let c = ''
// for (let i = 0; i < h.length; i++) {
// 	console.log(h[i], encodeURI(h[i]))
// 	c += encodeURI(h[i])
// }
// console.log(c, encodeURI(h))

// console.log(21, decodeURI(c))


// console.log(33, encodeURI(h))
/*
	%5B%20   %E3%80%90
	`%E3%80%90 DC-L08-05%EF%BC%88b)/DC-L-08-06(a)%E3%80%81DC-L-08-06(b)%E5%9C%B0%E5%9D%97%E3%80%91%E5%85%A8%E8%BF%87%E7%A8%8B%E9%80%A0%E4%BB%B7%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1%E5%90%AB%E6%96%BD%E5%B7%A5%E5%9B%BE%E5%B7%A5%E7%A8%8B%E9%87%8F%E6%B8%85%E5%8D%95%E5%8F%8A%E6%8E%A7%E5%88%B6%E4%BB%B7%E7%BC%96%E5%88%B6%EF%BC%89`

	`[DC-L08-05%EF%BC%88b)/DC-L-08-06(a)%E3%80%81DC-L-08-06(b)%E5%9C%B0%E5%9D%97%E3%80%91%E5%85%A8%E8%BF%87%E7%A8%8B%E9%80%A0%E4%BB%B7%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1%E5%90%AB%E6%96%BD%E5%B7%A5%E5%9B%BE%E5%B7%A5%E7%A8%8B%E9%87%8F%E6%B8%85%E5%8D%95%E5%8F%8A%E6%8E%A7%E5%88%B6%E4%BB%B7%E7%BC%96%E5%88%B6%EF%BC%89`
	*/

// const getRandomColor = () => {
// 	let l = Math.random() < .5 ? 4 : 7
// 	return (function (c) {
// 		return (c += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && c.length === l ? c : arguments.callee(c)
// 	})('#')
// }

function getRandomColor(length) {
	let l = length || (Math.random() < .5 ? 3 : 6)
	return '#' + (function setColor(c) {
		return (c += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && c.length === l ? c : setColor(c)
	})('')
}
// 0.2.2.0.1.0.2.0.1.0.1.0.1.0.1.0.1.0.1.0.1.0.2.0.1.0.1.0.1.0.2.0.1.0.1.0.1.0.2.0.1.0.1.0.1

function getRandomRGBA(flg) {
	let rgba = ''
	for (let i = 0; i < 3; i++) {
		let r = Math.floor(Math.random() * 256) + (i < 2 ? ',' : '')
		console.log(r)
		rgba += r
	}
	return flg ? `rgba(${rgba},${Math.floor(Math.random() * 100) / 100})` : `rgb(${rgba})`
}


let h = `
<code class="prism language-js has-numbering" onclick="mdcp.signin(event)" style="position: unset;"><span class="token comment">// 获取浏览器类型</span>
<span class="token keyword">function</span> <span class="token function">getBrowserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span>

  <span class="token comment">// 获取浏览器 userAgent</span>
  <span class="token keyword">var</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent
  
  <span class="token comment">// 是否为 Opera</span>
  <span class="token keyword">var</span> isOpera <span class="token operator">=</span> ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'Opera'</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOpera<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'Opera'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 IE</span>
  <span class="token keyword">var</span> isIE <span class="token operator">=</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'compatible'</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'MSIE'</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isOpera
  <span class="token keyword">var</span> isIE11 <span class="token operator">=</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'Trident'</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"rv:11.0"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isIE11<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'IE11'</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>isIE<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span>
    <span class="token comment">// 检测是否匹配</span>
    <span class="token keyword">var</span> re <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'MSIE (\\d+\\.\\d+);'</span><span class="token punctuation">)</span>
    re<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span>
    <span class="token comment">// 获取版本</span>
    <span class="token keyword">var</span> ver <span class="token operator">=</span> <span class="token function">parseFloat</span><span class="token punctuation">(</span>RegExp<span class="token punctuation">[</span><span class="token string">"$1"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ver <span class="token operator">==</span> <span class="token number">7</span><span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'IE7'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ver <span class="token operator">==</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'IE8'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ver <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'IE9'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ver <span class="token operator">==</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'IE10'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">"IE"</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 Edge</span>
  <span class="token keyword">var</span> isEdge <span class="token operator">=</span> ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Edge"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isEdge<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'Edge'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 Firefox</span>
  <span class="token keyword">var</span> isFirefox <span class="token operator">=</span> ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Firefox"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isFirefox<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'Firefox'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 Safari</span>
  <span class="token keyword">var</span> isSafari <span class="token operator">=</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Safari"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Chrome"</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isSafari<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">"Safari"</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 Chrome</span>
  <span class="token keyword">var</span> isChrome <span class="token operator">=</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Chrome"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Safari"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"Edge"</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isChrome<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'Chrome'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 UC</span>
  <span class="token keyword">var</span> isUC<span class="token operator">=</span> ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"UBrowser"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isUC<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'UC'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 是否为 QQ</span>
  <span class="token keyword">var</span> isQQ<span class="token operator">=</span> ua<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"QQBrowser"</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token comment">// 返回结果</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isUC<span class="token punctuation">)</span> <span class="token punctuation">{<!-- --></span> <span class="token keyword">return</span> <span class="token string">'QQ'</span> <span class="token punctuation">}</span>

  <span class="token comment">// 都不是</span>
  <span class="token keyword">return</span> <span class="token string">''</span>
<span class="token punctuation">}</span>
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{&quot;spm&quot;:&quot;1001.2101.3001.4334&quot;}"></div></code>
`
h = h.replace(/<\/?[a-z]{1,}[^>]*?>/g, '')
console.log(h)



// 获取浏览器类型
function getBrowserType() {

	// 获取浏览器 userAgent
	var ua = navigator.userAgent

	// 是否为 Opera
	var isOpera = ua.indexOf('Opera') > -1
	// 返回结果
	if (isOpera) { return 'Opera' }

	// 是否为 IE
	var isIE = (ua.indexOf('compatible') > -1) && (ua.indexOf('MSIE') > -1) && !isOpera
	var isIE11 = (ua.indexOf('Trident') > -1) && (ua.indexOf("rv:11.0") > -1)
	// 返回结果
	if (isIE11) {
		return 'IE11'
	} else if (isIE) {
		// 检测是否匹配
		var re = new RegExp('MSIE (\d+\.\d+);')
		re.test(ua)
		// 获取版本
		var ver = parseFloat(RegExp["$1"])
		// 返回结果
		if (ver == 7) {
			return 'IE7'
		} else if (ver == 8) {
			return 'IE8'
		} else if (ver == 9) {
			return 'IE9'
		} else if (ver == 10) {
			return 'IE10'
		} else { return "IE" }
	}

	// 是否为 Edge
	var isEdge = ua.indexOf("Edg") > -1
	// 返回结果
	if (isEdge) { return 'Edge' }

	// 是否为 Firefox
	var isFirefox = ua.indexOf("Firefox") > -1
	// 返回结果
	if (isFirefox) { return 'Firefox' }

	// 是否为 Safari
	var isSafari = (ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)
	// 返回结果
	if (isSafari) { return "Safari" }

	// 是否为 Chrome
	var isChrome = (ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edge") == -1)
	// 返回结果
	if (isChrome) { return 'Chrome' }

	// 是否为 UC
	var isUC = ua.indexOf("UBrowser") > -1
	// 返回结果
	if (isUC) { return 'UC' }

	// 是否为 QQ
	var isQQ = ua.indexOf("QQBrowser") > -1
	// 返回结果
	if (isUC) { return 'QQ' }

	// 都不是
	return ''
}




