let arr = [1, 2, 3, 4]
let s = new Set([...arr])
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


let h = `http://47.108.226.58:8081/static/tender/9365752870…rformance/3c9d17da090643d684686d9f5c3e066a.jpg?i0`


console.log(313, h.indexOf('http://47.108.226.58:8081/static/tender/9365752870…rformance/3c9d17da090643d684686d9f5c3e066a.jpg'))














