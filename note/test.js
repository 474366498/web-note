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
110kV 碾柏线起于 220kV 水碾变电站，止于 220kV 柏树堡变电站。本工程在现状 110kV 碾柏线 26#小号侧约 14m 处新立NB1 塔与原 110kV 碾柏线 25#连通，然后线路左转在规划绿地边缘新立NB2 塔、NB3 塔，接着线路右转跨过公路后沿中小学规划用地边缘向东南方向走线，在中小学规划用地红线边缘新立NB4 塔、NB5 塔与 110 千伏碾柏线 28 号至30 号线路迁改已建钢管塔 G1塔连通。新建架空线路 0.404km，新立单回路耐张钢管塔 5 基，导线采用JL/G1A-150/25 钢芯铝绞线，地线采用两根 JLB20A-50 铝包钢绞线。拆除原110kV 碾柏线 26#-G1#线路长度 0.3Km,拆除原线路杆塔 2 基。重新调整弧垂0.502km，更换原 110kV 碾柏线 G1-G2 耐张段B 相导线长度 0.068km。
`
console.log(h.length)

const manageAndEmit = ["Start", "Add", "Remove", "Update", "End"];
const emit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
const manage = ["Move"];
const eventHandlerNames = [manage, manageAndEmit, emit]
	.flatMap(events => events)
	.map(evt => `on${evt}`);

const events = {
	manage,
	manageAndEmit,
	emit
};

function isReadOnly(eventName) {
	return eventHandlerNames.indexOf(eventName) !== -1;
}
console.log(events, eventHandlerNames)





let positions = [], count = 256
for (let i = 0; i < count; i++) {
	for (let m = 0; m < count; m++) {
		for (let n = 0; n < 1; n++) {
			positions.push({
				i: i * m,
				id: `id_${i},${m},${n}`,
				value: `rgba(${i},${m},${n},1)`
			})
		}
	}

}


console.log(102, positions)


