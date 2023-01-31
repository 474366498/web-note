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


let h = ``

// let t = new Date(1674958430000)

let time = new Date(new Date().getTime()),
	timeStr = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + (time.getHours()) + ':' + (time.getMinutes())
function formatTime(d, fmt) {

}

log(timeStr)


let verifyData = ['e', 'v', 's', 'ee']
	.map((item, i, all) => {
		let radius = 360 / all.length, w = 400 / 2, h = 300 / 2, r = h, pi = Math.PI / 180
		let translate = {
			x: Math.cos(pi * 90),
			y: Math.sin(pi * radius)
		}
		console.log(36, all, r, radius, pi, translate)

		// let scale = {
		// 	x: (80 + Math.random() * 40) / 100,
		// 	y: (90 + Math.random() * 40) / 100
		// }
		// let rotate = 360 * Math.random() + 'deg'
		// let style = {
		// 	backgroundColor: 'rgba(255,255,255,.2)',
		// 	// transform : `translate(${translate.x},${translate.y}) scale(${scale.x},${scale.y}) rotate(${rotate})`
		// }
		return {
			label: item,
			sort: i,
			point: null,
			// style
		}
	})

log(5 ** 5, verifyData)









