/*
var log = console.log;
var template =
	'My avorite sports:' +
	'<%if(this.showSports) {%>' +
	'<% for(var index in this.sports) {   %>' +
	'<a><%this.sports[index]%></a>' +
	'<%}%>' +
	'<%} else {%>' +
	'<p>none</p>' +
	'<%}%>';
// 这是我们要拼接的函数字符串
const code = `with(obj) {
	console.log(13,obj)
	var r=[];
	r.push("My avorite sports:");
	if(this.showSports) {
		for(var index in this.sports) {   
			r.push("<a>");
			r.push(this.sports[index]);
			r.push("</a>");
		}
	} else {
		r.push("<span>none</span>");
	}
	return r.join("");
}`
// 动态渲染的数据
const options = {
	sports: ["swimming", "basketball", "football"],
	showSports: true
}
// 构建可行的函数并传入参数，改变函数执行时this的指向
result = new Function("obj", code).apply(options, [options]);

log(result);


let array = [
	{
		"menuname": "基础plugin",
		"icon": "",
		"menuid": "base~plugin",
		"url": null,
		"menus": [
			{
				"menuname": "前端埋点",
				"icon": "",
				"menuid": "buriedPoint",
				"menus": [],
				"url": "buriedPoint"
			},
			{
				"menuname": "webWorker",
				"icon": "",
				"menuid": "webWorker",
				"menus": [],
				"url": "webWorker"
			},
			{
				"menuname": "字符串加密",
				"icon": "",
				"menuid": "encrypt",
				"menus": [],
				"url": "encrypt"
			}
		]
	},
	{
		"menuname": "文件类plugin",
		"icon": "",
		"menuid": "file-plugin",
		"url": null,
		"menus": [
			{
				"menuname": "上传(node)",
				"icon": "",
				"menuid": "upload",
				"menus": [],
				"url": "upload"
			},
			{
				"menuname": "大文件(node)",
				"icon": "",
				"menuid": "bigFile",
				"menus": [],
				"url": "bigFile"
			},
			{
				"menuname": "下载(node)",
				"icon": "",
				"menuid": "download",
				"menus": [],
				"url": "download"
			},
			{
				"menuname": "文件预览",
				"icon": "",
				"menuid": "textWordView",
				"menus": [],
				"url": "textWordView"
			},
			{
				"menuname": "打印",
				"icon": "",
				"menuid": "print",
				"menus": [],
				"url": "print"
			},
			{
				"menuname": "图片编辑",
				"icon": "",
				"menuid": "picEdit",
				"menus": [],
				"url": "picEdit"
			}
		]
	},
	{
		"menuname": "音视频plugin",
		"icon": "",
		"menuid": "multimedia~plugin",
		"url": null,
		"menus": [
			{
				"menuname": "音视频播放",
				"icon": "",
				"menuid": "multimedia",
				"menus": [],
				"url": "multimedia"
			}
		]
	},
	{
		"menuname": "地图plugin",
		"icon": "",
		"menuid": "map~plugin",
		"url": null,
		"menus": [
			{
				"menuname": "百度地图",
				"icon": "",
				"menuid": "bMap",
				"menus": [],
				"url": "bMap"
			},
			{
				"menuname": "腾讯地图",
				"icon": "",
				"menuid": "tMap",
				"menus": [],
				"url": "tMap"
			}
		]
	}
]

find(array, 'menus', 'url', 'encrypt')
function find(items, childKey, findKey, val) {

	var result
	let has = _find(items, childKey, findKey, val)
	console.log(161, has, result)
	function _find(data, ckey, fkey, val) {
		for (let i = 0; i < data.length; i++) {
			let item = data[i]
			if (item[fkey] === val) {
				result = item
				console.log(166, item, result)
				return
			} else {
				if (item[ckey]) {
					_find(item[ckey], ckey, fkey, val)
				}
			}
		}
		// data.map(item => {

		// })
	}

}

let str = `
< div id="infoContainer" class="container news-detailed">
	< h2 class="detailed-title" id="title"> 1000 万吨 - 水土保持与矿山地质环境保护及土地复垦勘查设计中标结果公告 < /h2> < span id="relateinfoid" class="hidden" data - value="51340000000004100001">
			< /span> < p class="detailed-desc"> 发布时间： < span id="date"> 2023 - 06 - 27 11: 45: 08 < /span>&nbsp;&nbsp;&nbsp;&nbsp;来源： <span id="source">凉山州公共资源交易服务中心</span> & nbsp; & nbsp; & nbsp; & nbsp;
						浏览次数： < span id="infoViewCount">
							< /span>&nbsp;&nbsp;&nbsp;&nbsp; <span id="originurl" class="hidden">
								<a data-value="https:/ / lsz.ztbcn.com / Publish / WinBidderInfo ? id = d2889901 - 60 d2 - 409 a - a49a - ef67e6cdbeb9 " href="
javaScript: void(0)
" id="
originurl_a ">原文链接</a>
								</span>
								</p>
								< div class="clearfix" id="newsText">
									< meta http - equiv="Content-Type" content="text/html; charset=utf-8">
										< title>
											< /title> < style type="text/css">
												.csAB68B66C {
												text - align: center;
												text - indent: 0 pt;
												margin: 0 pt 0 pt 0 pt 0 pt;
												line - height: 34 pt;
												mso - line - height - rule: exactly
												}
												.csDF5EA210 {
												color: #000000;background-color:transparent;font-family:宋体;font-size:22pt;font-weight:bold;font-style:normal;}
												.cs9C86A3F3{text-align:left;text-indent:0pt;margin:0pt 0pt 0pt 0pt;line-height:40pt;mso-line-height-rule:exactly}
												.csF5060159{color:# 000000;background - color: transparent;font - family: 宋体;font - size: 14 pt;font - weight: bold;font - style: normal;text - decoration: underline;
												}
												.cs9D7773DC {
												color: #000000;background-color:transparent;font-family:宋体;font-size:14pt;font-weight:normal;font-style:normal;}
												.csD6F60343{text-align:left;text-indent:28pt;margin:0pt 0pt 0pt 0pt;line-height:40pt;mso-line-height-rule:exactly}
												.cs15DFDD85{color:# 212121;background - color: transparent;font - family: 宋体;font - size: 9 pt;font - weight: bold;font - style: normal;text - decoration: underline;
												}
												.cs757FDC77 {
												color: #000000;background-color:transparent;font-family:宋体;font-size:12pt;font-weight:bold;font-style:normal;text-decoration: underline;}
												.csE93AD40C{text-align:right;text-indent:0pt;margin:0pt 0pt 0pt 0pt;line-height:34pt;mso-line-height-rule:exactly}
												.csFD73242{color:# 212121;background - color: transparent;font - family: 宋体;font - size: 9 pt;font - weight: normal;font - style: normal;
												}
												.cs30C86FB6 {
												color: #000000;background-color:transparent;font-family:宋体;font-size:14pt;font-weight:normal;font-style:normal;text-decoration: underline;}
												.csF11D611B{text-align:left;text-indent:223pt;margin:0pt 0pt 0pt 72pt;line-height:34pt;mso-line-height-rule:exactly}
												.cs690FC437{text-align:left;text-indent:0pt;margin:0pt 0pt 0pt 0pt;line-height:34pt;mso-line-height-rule:exactly}
												.cs1B16EEB5{color:# 000000;background - color: transparent;font - family: Calibri;font - size: 11 pt;font - weight: normal;font - style: normal;
												}
												.cs95E872D0 {
												text - align: left;
												text - indent: 0 pt;
												margin: 0 pt 0 pt 0 pt 0 pt
												} < /style> < p class="csAB68B66C">
													< span class="csDF5EA210"> 中 标 结 果 公 告 < /span> </p> < p class="cs9C86A3F3">
															< span class="csF5060159"> 四川省核工业地质局二八一大队 < /span> <span class="cs9D7773DC">(中标人名称)： </span>
																	< /p> < p class="csD6F60343">
																		< span class="cs9D7773DC"> 你单位于 < /span> <span class="csF5060159">2023年6月09日</span>
																				< span class="cs9D7773DC"> (投标日期) 所递交的 < /span> <span class="csF5060159">1000万吨-水土保持与矿山地质环境保护及土地复垦勘查设计</span>
																						< span class="cs9D7773DC"> (项目名称) 投标文件已被招标人接受， 被确定为中标人。 < /span> </p> < p class="csD6F60343">
																								< span class="cs9D7773DC"> 中标价: < /span> <span class="cs15DFDD85">
																										</span>
																										< span class="csF5060159"> 3283750.00 元 < /span> <span class="cs9D7773DC">，其中（勘查费</span>
																												< span class="csF5060159"> 647500.00 < /span> <span class="cs9D7773DC">、设计费</span>
																														< span class="csF5060159"> 2636250.00 元 < /span> <span class="cs9D7773DC">。）</span>
																																< /p> < p class="csD6F60343">
																																	< span class="cs9D7773DC"> 勘查设计周期: < /span> <span class="cs757FDC77">
																																			</span>
																																			< span class="csF5060159"> 1100 < /span> <span class="cs9D7773DC">日历天。 </span>
																																					< /p> < p class="csD6F60343">
																																						< span class="cs9D7773DC"> 工程质量: 符合 < /span> <span class="csF5060159">国家行业现行相关标准、规范和本招标文件及业主要求</span>
																																								< span class="cs9D7773DC"> 。 < /span> </p> < p class="csD6F60343">
																																										< span class="cs9D7773DC"> 项目负责人: < /span> <span class="csF5060159">梁富</span>
																																												< span class="cs9D7773DC"> (姓名)。 < /span> </p> < p class="csD6F60343">
																																														< span class="cs9D7773DC"> 请你单位在接到本通知书后的 < /span> <span class="csF5060159">30</span>
																																																< span class="cs9D7773DC"> 日内到 < /span> <span class="csF5060159">重钢西昌矿业有限公司</span>
																																																		< span class="cs9D7773DC"> (指定地点) 与招标人签订合同， 在此之前按招标文件第二章 "投标人须知"
																																																			第7 .3 款规定向招标人提交履约担保。 < /span> </p> < p class="csD6F60343">
																																																				< span class="cs9D7773DC"> 特此通知。 < /span> </p> < p class="csE93AD40C">
																																																						< span class="cs9D7773DC"> 招标人: < /span> <span class="csFD73242">
																																																								</span>
																																																								< span class="csF5060159"> 重钢西昌矿业有限公司 < /span> <span class="cs9D7773DC">(盖单位章) </span>
																																																										< /p> < p class="csE93AD40C">
																																																											< span class="cs9D7773DC"> & nbsp; < /span> </p> < p class="csE93AD40C">
																																																													< span class="cs9D7773DC"> 法定代表人或其委托代理人: < /span> <span class="cs30C86FB6"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
																																																															< span class="cs9D7773DC"> (签字) < /span> </p> < p class="csF11D611B">
																																																																	< a name="_Toc266454871">
																																																																		< span class="csF5060159"> 2023 < /span> <span class="cs9D7773DC">年</span>
																																																																				< span class="csF5060159"> 6 < /span> <span class="cs9D7773DC">月</span>
																																																																						< span class="csF5060159"> 19 < /span> <span class="cs9D7773DC">日</span>
																																																																								< /a> </p> < p class="cs690FC437">
																																																																									< span class="cs1B16EEB5"> & nbsp; < /span> </p> < p class="cs95E872D0">
																																																																											< span class="cs1B16EEB5"> & nbsp; < /span> </p> < /div> < div class="attach_content">
																																																																													< /div> < input type="hidden" id="souceinfoid" value="d2889901-60d2-409a-a49a-ef67e6cdbeb9">
																																																																														< /div> < div id="tab_view_f" class="container hidden news-detailed">
																																																																															< !--html-->
																																																																																< div class="tab-view">
																																																																																	< div class="ewb-tab" data - role="head">
																																																																																		< ul class="clearfix">
																																																																																			< li class="ewb-tab-node">
																																																																																				< a class="ewb-tab-name current" data - value="503" data - role="tab" data - target="tab-503"> 招标公告 < /a> </li> < li class="ewb-tab-node">
																																																																																						< a class="ewb-tab-name" data - value="514" data - role="tab" data - target="tab-514"> 资格预审补遗 / 澄清 < /a> </li> < li class="ewb-tab-node">
																																																																																								< a class="ewb-tab-name" data - value="504" data - role="tab" data - target="tab-504"> 招标文件补遗 / 澄清 < /a> </li> < li class="ewb-tab-node">
																																																																																										< a class="ewb-tab-name" data - value="517" data - role="tab" data - target="tab-517"> 流标或终止公告 < /a> </li> < li class="ewb-tab-node">
																																																																																												< a class="ewb-tab-name" data - value="506" data - role="tab" data - target="tab-506"> 开标记录 < /a> </li> < li class="ewb-tab-node">
																																																																																														< a class="ewb-tab-name" data - value="511" data - role="tab" data - target="tab-511"> 评标结果公示 < /a> </li> < li class="ewb-tab-node">
																																																																																																< a class="ewb-tab-name" data - value="513" data - role="tab" data - target="tab-513"> 中标结果公示 < /a> </li> < li class="ewb-tab-node">
																																																																																																		< a class="ewb-tab-name" data - value="512" data - role="tab" data - target="tab-512"> 签约履行 < /a> </li> < /ul> < /div> < div class="container-body" data - role="body">
																																																																																																				< div data - role="tab-content" id="tab-503" data - id="tab-503">
																																																																																																					< !--开始-->
																																																																																																						< !--结束-->
																																																																																																							< /div> < div class="hidden" data - role="tab-content" id="tab-514" data - id="tab-514">
																																																																																																								< /div> < div class="hidden" data - role="tab-content" id="tab-504" data - id="tab-504">
																																																																																																									< /div> < div class="hidden" data - role="tab-content" id="tab-517" data - id="tab-517">
																																																																																																										< /div> < div class="hidden" data - role="tab-content" id="tab-506" data - id="tab-506">
																																																																																																											< /div> < div class="hidden" data - role="tab-content" id="tab-511" data - id="tab-511">
																																																																																																												< /div> < div class="hidden" data - role="tab-content" id="tab-513" data - id="tab-513">
																																																																																																													< /div> < div class="hidden" data - role="tab-content" id="tab-512" data - id="tab-512">
																																																																																																														< /div> < /div> < /div> < /div>
`


str.replace(/<(style)[^>]*?>[\s\s\S]*?<\/(style)>/gi)

const _permute = string => {
	const result = []
	const map = new Map()
	const dfs = (path) => {
		if (path.length === string.length) {
			result.push(path)
			return
		}
		for (let i = 0; i < string.length; i++) {
			if (map.get(string[i])) continue
			map.set(string[i], true)
			path += string[i]
			console.log('before:', path, i)
			dfs(path)
			path = path.substring(0, path.length - 1)
			console.log('after:', path, i)
			map.set(string[i], false)
		}
	}
	dfs('')
	console.log(320, map)
	return result
}
console.log(322, _permute('ab'))



let html = `
<div class="ewb-shade"> 
 <div class="ewb-info-hd"> 
	<h2 id="titlecontent">围场县第二中学（分校）新建工程项目—宿舍楼工程中标公告</h2> 
	<p>项目编号：<span id="PROJECTNO"></span></p> 
 </div> 
 <div class="ewb-info-intro"> 
	<span>发布时间：2023-08-08 06:27:33<span></span></span>
	<span>信息来源：<span id="infod">围场满族蒙古族自治县</span><span id="zhuanzai" class="hidden">围场满族蒙古族自治县</span></span> 
	<span>阅读次数：<span id="infoViewCount"></span></span> 
 </div> 
 <div class="tabview ewb-bulid"> 
	<div class="ewb-bulid-hd" data-role="head"> 
	 <ul class="clearfix" id="liucheng"> 
	 </ul> 
	</div> 
	<div data-role="body"> 
	 <div data-role="tab-content" data-id="a" class="ewb-bulid-panel"> 
		<div class="ewb-countdown"> 
		 <div class="ewb-count-start"> 
			<span class="hidden" id="youxiaodate"></span> 
			<p class="ewb-count-tt">报名倒计时</p> 
			<div class="ewb-count-info"> 
			 <span class="ewb-count-num" id="day"></span> 
			 <span class="ewb-count-name">天</span> 
			 <span class="ewb-count-num" id="hour"></span> 
			 <span class="ewb-count-name">小时</span> 
			 <span class="ewb-count-num" id="minute"></span> 
			 <span class="ewb-count-name last">分钟</span> 
			</div> 
		 </div> 
		  
		 <div class="ewb-count-end"> 
			<p>报名已结束</p> 
		 </div> 
		</div> 
		<div class="ewb-copy"> 
		 <span> 
			<table border="1" cellspacing="0" style="border:currentColor;width:700.8pt;border-collapse:collapse;"> 
			 <tbody> 
				<tr> 
				 <td style="background:#FFFFFF;border:0px #000000;" width="1401"><p style="text-align:center;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:18pt;font-weight:bold;"> <span>围场县第二中学（分校）新建工程项目</span> <span>—宿舍楼工程</span> </span> </b> <b> <span style="color:#4C4948;font-family:宋体;font-size:18pt;font-weight:bold;"> <span>中标公告</span> </span> </b> </p> </td>
				</tr> 
				<tr> 
				 <td style="background:#FFFFFF;border:0px #000000;" width="1401">
					<table border="1" cellspacing="0" style="border:currentColor;width:693pt;border-collapse:collapse;"> 
					 <tbody> 
						<tr> 
						 <td colspan="4" style="background:#F3F3F3;border:0px #000000;"><p style="text-align:left;text-indent:21pt;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>基本信息</span> </span> </b> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>标段</span> <span>(包)</span> </span> </b> </p> </td>
						 <td colspan="3" style="border:0px #000000;background-color:transparent;"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>围场县第二中学（分校）新建工程项目</span> <span>—宿舍楼工程</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>所属行业：</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="478"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>建筑业</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="269"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>所属地区：</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="416"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>围场满族蒙古族自治县</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>开标时间</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="478"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>2023-08-03 09:30</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="269"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>公示发布日期</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="416"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>2023-08-08</span> </span> </p> </td>
						</tr> 
					 </tbody> 
					</table> <p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;">&nbsp;</span> </p> </td>
				</tr> 
				<tr> 
				 <td style="background:#FFFFFF;border:0px #000000;" width="1401">
					<table border="1" cellspacing="0" style="border:currentColor;width:693.3pt;border-collapse:collapse;"> 
					 <tbody> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>排名</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="135"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>统一社会信用代码</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="216"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>中标单位名称</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="197"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>中标价格</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="308"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>大写中标价格</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="181"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>质量标准</span> </span> </b> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="313"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>工期</span> <span>/交货期</span> </span> </b> </p> </td>
						</tr> 
						<tr> 
						 <td style="border:0px #000000;background-color:transparent;"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>1</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="135"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>9113082810924237XA</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="216"><p style="text-align:left;vertical-align:middle;"> <span style="color:#000000;font-family:宋体;font-size:11pt;font-style:normal;"> <span>围场满族蒙古族自治县鑫亚建筑安装有限公司</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="197"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>33459334.7元人民币</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="308"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>叁仟叁佰肆拾伍万玖仟叁佰叁拾肆元柒角</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="181"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>合格</span> </span> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="313"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>405日历天</span> </span> </p> </td>
						</tr> 
					 </tbody> 
					</table> <p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;">&nbsp;</span> </p> </td>
				</tr> 
				<tr> 
				 <td style="background:#FFFFFF;border:0px #000000;" width="1401">
					<table border="1" cellspacing="0" style="border:currentColor;width:693.05pt;border-collapse:collapse;"> 
					 <tbody> 
						<tr> 
						 <td colspan="4" style="background:#F3F3F3;border:0px #000000;" width="1386"><p style="text-align:left;text-indent:21pt;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>联系方式</span> </span> </b> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;" width="139"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>招标人：</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="527"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>围场满族蒙古族自治县第二中学</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="261"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>招标代理机构：</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="457"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>河北省成套招标有限公司</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;" width="139"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>联系人</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="527"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>朱建龙</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="261"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>联系人</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="457"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>张衷川、刘靖超</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;" width="139"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>地址</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="527"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>围场满族蒙古族自治县</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="261"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>地址</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="457"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>石家庄市工农路</span> <span>486号</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;" width="139"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>电话</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="527"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>03147516563</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="261"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>电话</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="457"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>0311-83086883</span> </span> </p> </td>
						</tr> 
						<tr> 
						 <td style="background:#F3F3F3;border:0px #000000;" width="139"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>电子邮箱</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="527"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>/</span> </span> </p> </td>
						 <td style="background:#F3F3F3;border:0px #000000;" width="261"><p style="text-align:left;"> <b> <span style="color:#4C4948;font-family:宋体;font-size:12pt;font-weight:bold;"> <span>电子邮箱</span> <span>:</span> </span> </b> </p> </td>
						 <td style="border:0px #000000;background-color:transparent;" width="457"><p style="text-align:left;"> <span style="color:#4C4948;font-family:宋体;font-size:12pt;"> <span>931649958@qq.com</span> </span> </p> </td>
						</tr> 
					 </tbody> 
					</table> <p style="text-align:left;"> <br> </p> </td>
				</tr> 
			 </tbody> 
			</table> </span> 
		 <span>附件信息:<br> </span>
		</div> 
		<div class="ewb-file"> 
		 <h3 id="fujian">附件</h3> 
		</div> 
	 </div> 
	</div> 
 </div> 
</div>


`


html = html.replace(/<table[^>]*?>[.]*(\s*<tbody[^>]*>)?/g, function ($p) {
	// console.log(480, $p)
	return `<div class='table-tbody'>`
})
	.replace(/<\/tbody[^>]*>/g, function (p) {
		// console.log(484, p)
		return ''
	})
	.replace(/<\/table[^>]*>/g, function (p) {
		// console.log(484, p)
		return `</div>`
	})
	.replace(/<tr[.]*>/g, `<div class='tr'>`)
	.replace(/<\/tr>/g, '</div>')
	.replace(/<t(d|h)[^>]*>[\s\S]*?<\/t(d|h)>/g, td => {
		let str = td.replace(/<[a-zA-Z]*[^>]*?>/g, '')
		console.log(494, td, '内容是：', str)
		return `<p class='td-p'>${str}</p>`
	})

console.log(html)
*/


// let query = `invoiceType=3&data=%7B%22invoicePeople%22:%22%E5%94%90%E7%BB%9C%22,%22invoiceUnit%22:%22%E5%85%A8%E5%92%A8%E9%83%A8%22,%22invoiceDate%22:%222023-08-19%2013:50:54%22,%22invoiceProject%22:%22%E4%B8%AD%E5%9B%BD%E8%9E%8D%E9%80%9A%E5%8C%BB%E7%96%97%E5%81%A5%E5%BA%B7%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E9%99%A2%E5%8C%BA%E7%BB%BC%E5%90%88%E6%95%B4%E6%B2%BB%E5%85%A8%E8%BF%87%E7%A8%8B%E5%B7%A5%E7%A8%8B%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1%E2%80%94%E6%B2%88%E9%98%B3%E5%8C%97%E6%96%B9%E5%8C%BB%E9%99%A2%22,%22invoicePaymentMethods%22:%5B%22%E7%BD%91%E9%93%B6%22,%22%E8%BD%AC%E6%94%AF%22,%22%E7%8E%B0%E9%87%91%22,%22%E5%85%B6%E4%BB%96%22%5D,%22invoicePaymentMethod%22:0,%22collectionUnit%22:%22%E6%88%B4%E4%B8%9C%E6%96%B0%22,%22collectionBank%22:%22%E4%B8%AD%E5%9B%BD%E5%BB%BA%E8%AE%BE%E9%93%B6%E8%A1%8C%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B2%88%E9%98%B3%E9%9D%92%E5%B1%B1%E8%B7%AF%E6%94%AF%E8%A1%8C%22,%22collectionBankCard%22:%226227%200007%203140%200084%20433%22,%22invoiceBusinessData%22:%5B%7B%22businessNumber%22:%221%22,%22businessDescribe%22:%22%E6%88%BF%E5%B1%8B%E7%A7%9F%E9%87%91%EF%BC%882023-9-10%E8%87%B32024-3-9%EF%BC%891900*6=11400%22,%22businessBills%22:0,%22businessTotal%22:11400%7D,%7B%22businessNumber%22:%222%22,%22businessDescribe%22:%22%E7%A8%8E%E9%87%911013.97%22,%22businessBills%22:0,%22businessTotal%22:1013.97%7D,%7B%22businessNumber%22:%223%22,%22businessDescribe%22:%22%22,%22businessBills%22:0,%22businessTotal%22:0%7D%5D,%22invoiceRemark%22:%22%22,%22invoiceCheckData%22:%5B%7B%22invoiceCheckType%22:%22%E5%85%A8%E5%92%A8%E9%A1%B9%E7%9B%AE%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E9%99%88%E9%B8%BF%E5%BF%97%22,%22invoiceCheckDate%22:%222023-08-23%2001:22:22%22%7D,%7B%22invoiceCheckType%22:%22%E9%80%A0%E4%BB%B7%E9%83%A8%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E5%BE%90%E5%89%91%22,%22invoiceCheckDate%22:%222023-08-23%2010:15:07%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E5%BE%90%E8%8D%A3%E8%8E%89%22,%22invoiceCheckDate%22:%222023-08-23%2013:25:10%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E6%80%BB%E7%9B%91%22,%22invoiceCheckIdea%22:%22%E9%BB%84%E6%96%87%E4%BF%8A%22,%22invoiceCheckDate%22:%222023-08-24%2013:36:05%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E6%80%BB%E7%9B%91%22,%22invoiceCheckIdea%22:%22%E7%8E%8B%E6%88%90%E8%89%B3%22,%22invoiceCheckDate%22:%222023-08-24%2014:10:06%22%7D,%7B%22invoiceCheckType%22:%22%E8%91%A3%E4%BA%8B%E9%95%BF%22,%22invoiceCheckIdea%22:%22%E7%8E%8B%E6%95%A6%E4%BC%9F%22,%22invoiceCheckDate%22:%222023-08-25%2020:53:10%22%7D%5D,%22invoiceAccessory%22:%223%22,%22invoiceTotalLower%22:12413.97%7D`
// var code = 0;
// var tempData = {};
// var vars = query.split("&");
// // console.log(vars)
// for (var i = 0; i < vars.length; i++) {
//   var pair = vars[i].split("=");
//   if (pair[0] == "invoiceType") {
//     code = parseInt(pair[1]);
//   }
//   if (pair[0] == "data") {
//     tempData = pair[1];
//   }
// }

// console.log(519, decodeURI(tempData))

// {"invoicePeople":"唐络","invoiceUnit":"全咨部","invoiceDate":"2023-08-19 13:50:54","invoiceProject":"中国融通医疗健康集团有限公司院区综合整治全过程工程咨询服务—沈阳北方医院","invoicePaymentMethods":["网银","转支","现金","其他"],"invoicePaymentMethod":0,"collectionUnit":"戴东新","collectionBank":"中国建设银行股份有限公司沈阳青山路支行","collectionBankCard":"6227 0007 3140 0084 433","invoiceBusinessData":[{"businessNumber":"1","businessDescribe":"房屋租金（2023-9-10至2024-3-9）1900*6

// {"invoicePeople":"唐络","invoiceUnit":"全咨部","invoiceDate":"2023-08-19 13:39:42","invoiceProject":"中国融通医疗集团医疗健康集团有限公司院区综合整治全过程工程咨询服务-沈阳一二一医院","invoicePaymentMethods":["网银","转支","现金","其他"],"invoicePaymentMethod":0,"collectionUnit":"唐络","collectionBank":"中国工商银行草市支行","collectionBankCard":"6212264402083690143","invoiceBusinessData":[{"businessNumber":"1","businessDescribe":"租房电费","businessBills":0,"businessTotal":117.5},{"businessNumber":"2","businessDescribe":"与院领导吃饭，买皮尺（50米）卷尺","businessBills":0,"businessTotal":340},{"businessNumber":"3","businessDescribe":"沈阳市交通费（沈阳市政务中心及皇姑区证务中心，皇姑局人防办、规划局，皇姑区政务中心咨询报规报建、沈阳勘察测绘院办理市政雨污手续）","businessBills":0,"businessTotal":382}],"invoiceRemark":"","invoiceCheckData":[{"invoiceCheckType":"全咨项目经理","invoiceCheckIdea":"陈鸿志","invoiceCheckDate":"2023-08-23 01:15:30"},{"invoiceCheckType":"造价部经理","invoiceCheckIdea":"徐剑","invoiceCheckDate":"2023-08-23 10:16:08"},{"invoiceCheckType":"财务专员","invoiceCheckIdea":"陈佼","invoiceCheckDate":"2023-08-23 13:18:41"},{"invoiceCheckType":"财务总监","invoiceCheckIdea":"黄文俊","invoiceCheckDate":"2023-08-24 13:33:07"},{"invoiceCheckType":"财务总监","invoiceCheckIdea":"王成艳","invoiceCheckDate":"2023-08-24 14:10:43"}],"invoiceAccessory":"1","invoiceTotalLower":839.5}

// var data = JSON.parse(decodeURI(tempData));
// console.log(517, tempData, data)



// let names = [
//   '微信图片_20230831105958.png',
//   "123123.png",
//   "u&gp=0.jpg",
//   "20200925160951746.png",
//   "陈秀英5月社保.jpg",
//   "index.png",
//   "timg (3).jpg"
// ]


// names.forEach(name => {
//   let match = name.match(/(\d{1,4})\W*\.\w{1,}$/)
//   // console.log(543, match, match ? match[1] : 0)
// })

// let sortMatch = item.name.match(/(\d{1,4})\W*\.\w{1,}$/)
// let sortNo = sortMatch && sortMatch[1] ? sortMatch[1] : 9999


// let sortMatch = item.name.match(/(\d{1,4})\W*\.\w{1,}$/)
// let sortNo = item.sortNo || (sortMatch && sortMatch[1] ? sortMatch[1] : 9999)



// const codeMap = []
// for (let i = 1; i < 13e1; i++) {
//   let item = { num: i, letter: String.fromCharCode(i) }
//   console.log(i, item)
//   codeMap.push(item)
// }
// console.log(561, codeMap)

let js = `

var encode_version = 'sojson.v4';
var __0x277b = ['d07CiSrDkQ==', 'woRLbnVq', 'w5rDsnVBw74=', 'XWXCjwzDmSA=', 'PMOzNw==', 'EWAF', 'HcKpw6kJ', 'TRQfw6DCmHhjRgQ=', 'eXXCjwTDkg==', 'AGHCi8KKKw==', 'DhjCqsOLFA==', 'KMOdwq3DqQU=', 'w5UdwrfDinY=', 'XcOGHMKYQQ==', 'F8KTUMKHSw==', 'WjU8w5fCuQ==', 'wo/ChWnCmsK/', 'REfDs8OC', 'BMO0wpBhYw==', 'CsO2wqLDgCU=', 'GmnCrsKIJQ==', 'wpIXDsKT', 'PGk5Bnc=', 'DcO+wo9Sw7Y=', 'woTCnUDDsMKD', 'FcK0cw==', 'ZMOCJg==', 'D8O1wqVtw5I=', 'UzjDjcOmwoY=', 'G8OCwovDmw0=', 'L8KnTMOr', 'eAhbdhg=', 'E8KuKMOPaw==', 'LcKfSMOSeA==', 'Zx1Sbg==', 'wroxIsOCJw==', 'w64rw641wrY=', 'C8OMwqJVw5I=', 'QGLClQXDmzfChg==', 'wqrDu8O2wovDiQ==', 'Km4Ow7PDjA==', 'McKMwpE=', 'QQ4T', 'Fh/CiMO7Iw==', 'KsK2R8OhYsOF', 'AMK+woXCj0Y=', 'UhTDoRopw7/Cp1chRQ==', 'T8OTKcKVYA==', 'E0NMw6UUXns6w7U+', 'TwgKw6DCsnVyVyDDow==', 'w4MxwrzDt8O1', 'w4wTwofDuXA8wrh/wpEN', 'w5g/w4EWwoE=', 'XXXCnA==', 'w6UWwrTDjMOJ', 'woh/woXDgsOfLMO2', 'w78bwp0=', 'Hl/CjkjDpw==', 'w77DuEg=', 'KcOLwqjDtgU=', 'MFATcg==', 'fg5deig=', 'ZcKgRsOzZMOORQ==', 'wo0CBw==', 'Ak5dw7s2Uno=', 'd8KKwrjDv8O+Sg==', 'CU5Vw7gk', 'w588w7w8woYRaA==', 'wqkIK8O0Cw==', 'JcKLw6IWTg==', 'BMK4w7oCQA==', 'eEzCqDDDqw==', 'wrAcFFPDicOE', 'PsKWw4E9Vg==', 'TlvDt8OdLUPDtSAlwo4=', 'w6UwwqvDkmI=', 'wrrDo8O7wpDDvk0pw5hCwpA=', 'CRLCisO7Cw==', 'wonCkETCncKE', 'BFhqw5IU', 'MjfDviJk', 'IcKXCsOTUg==', 'IcKxMyjDlg==', 'w4rDvmxRw5w=', 'GcO6wo/Dog==', 'woVoenV7', 'CMOywrdww7E=', 'wpVYdEt4', 'DcO3O8Ov', 'woMrE8KcRw==', 'Jnw/w7/DgQ==', 'J3tuw7MA', 'wq7DjMOS', 'wrjDu8Oqwo7DhA==', 'FkDCqUbDhA==', 'w4MewojDrEc7', 'w65nwoHDo8OV', 'QU3CpA7Dog==', 'PGdiw5sS', 'OMOWw6s=', '6Kyq6Ly95Yeu5rKB5ayg', 'w49pwozDmQ==', 'DEArw5TDmQ==', 'b2Yaw5bDikQ=', 'wpHChm3Cv8KzwrA=', 'wp3CnEPDl8KQwobDng==', 'w7sxw5oRwqw=', 'GsO0wrA=', 'MsOkwo1gw60=', 'wq0gPsObOw==', 'H8O5wrFFw6E=', 'FcOZwq5mw43Cpw==', 'VwXDh8OrwrbDvQ==', 'VAXDqSIY', 'NhTCuMOfOMOIfA==', 'OgPCtcOwMg==', 'w74zw58=', 'RAnDlQY8', 'L2jCuMKKJQ==', 'KsOZwqLDgxk=', 'JX4EEXs=', 'BTHCnsOQKA==', 'wo/Dm8OXM3w=', 'wqrChnbCjMKQ', 'BsOMwrXCj8Kb', 'ZxPDhSUi', 'Ng7CucOX', 'ImHDrApo', 'V8OzwrcL', 'SMOmwr4TVA==', 'FsOGwqN7w6o=', 'w4hjwoTDkcOEKA==', 'wp7Ch20=', 'w7MMExvDl8OfVg==', 'w60xw4g=', 'C8KrGhPDrkM=', 'wo0vwpLCk8KfdA==', 'w57CkGzCrcK1wrvDow==', '6KyV6Lyh5YeR5rC/5a2b', 'HsOmw74=', '6K+06L6Q5YSRw6TDqmrDr8Kd576b56KA', 'ZFnDk8O8Jw==', 'wq4GF8OnIw==', 'wrVOdFp6', 'PGk5', 'RsOWwp8LaQ==', 'wpDCkGQ=', 'P2MbRcOt', 'wojCkyTDow==', 'wqrCsSDDl2k=', 'wq/DqsO2', 'AMOwwox4Z8KddA==', 'QMOqHcKDeA==', 'C8OZwrBtw5jCrMKb', 'GMO6wpDClMKC', 'aGHDoMOZKA==', 'SC5VWRk=', 'woZlHw==', 'K1oSw4DDhA==', 'N8OgwrFcVw==', 'wqTCnW/Dk8Kh', 'wrtHAQ==', 'BcOzLsOuwrk=', 'w4IIwoE=', 'bmQOw6PDuA==', 'wpdscG4=', 'wooXLMOtJg==', 'w6XDqkM=', 'wrnDmMO+wqcy', 'JnHCs33Dl8Kwwrs=', 'wpEWLg==', 'A8KeZw==', 'O8K3wq4=', 'wpTDgcOT', 'FcK8e8KnZw==', 'BmvDmStBL8OP', 'c8KGw7RJQ8KL', 'MsO6wrd3w4o=', 'wp/DlsOtwqAd', 'JMOSwr9jTQ==', 'O8KIRcOoBQ==', 'K8Otwq8=', '6K6T6LyQ5YS7w5fClDDDr8Ot572e56Gu', 'JgnCpcOrCg==', 'aznDlis9', 'KsOLwrzDjDQ=', 'Pg/DrQ==', 'PsKOYsOMJg==', 'wqg1KMOZ', 'EcOtOsOnwqYfwqzCsCw=', 'FsOewqpkw5rCuw==', 'DHrCrMKZNgEcHA==', 'w5IswoPDqsOuEEFSAcO1wp9jw7bCm0/DqMO4w44zwot9woovFMKowpDDmMOx', 'Hw/Drz4Aw6PCsXYqXjUdT8OmScOQWsOOwrBoUDhjR8K8O8Oqw7Y6UQMaJx5cw53Ctw==', 'wpLCkXo=', '6K+06L6Q5YSR5rO45a+p', 'O8Oiw5g=', 'PsKqw54=', 'XBLDrg==', 'wrXDucOJ', 'DG3Dgg==', 'DmnDjA==', 'UjTDsA==', 'K8KIGg==', 'wplwFsOJ', 'AmMgw5nDkAQCVMKx', 'H8KvwptJNQ==', 'NnkgSMO3']; (function(_0x590624, _0x50c3b7) {
	var _0x394941 = function(_0x31d664) {
		while (--_0x31d664) {
			_0x590624['push'](_0x590624['shift']());
		}
	};
	var _0x2ddadf = function() {
		var _0x38a83e = {
			'data': {
				'key': 'cookie',
				'value': 'timeout'
			},
			'setCookie': function(_0x3d6309, _0x257bd8, _0x28cb7a, _0x577703) {
				_0x577703 = _0x577703 || {};
				var _0x4a0e5f = _0x257bd8 + '=' + _0x28cb7a;
				var _0x56b751 = 0x0;
				for (var _0x56b751 = 0x0,
				_0x2b6a05 = _0x3d6309['length']; _0x56b751 < _0x2b6a05; _0x56b751++) {
					var _0x5e5711 = _0x3d6309[_0x56b751];
					_0x4a0e5f += ';\x20' + _0x5e5711;
					var _0x1dd7d3 = _0x3d6309[_0x5e5711];
					_0x3d6309['push'](_0x1dd7d3);
					_0x2b6a05 = _0x3d6309['length'];
					if (_0x1dd7d3 !== !![]) {
						_0x4a0e5f += '=' + _0x1dd7d3;
					}
				}
				_0x577703['cookie'] = _0x4a0e5f;
			},
			'removeCookie': function() {
				return 'dev';
			},
			'getCookie': function(_0x4b0714, _0x21d8c4) {
				_0x4b0714 = _0x4b0714 ||
				function(_0x297b93) {
					return _0x297b93;
				};
				var _0x13409f = _0x4b0714(new RegExp('(?:^|;\x20)' + _0x21d8c4['replace'](/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)'));
				var _0x275925 = function(_0x5365a5, _0x6818cc) {
					_0x5365a5(++_0x6818cc);
				};
				_0x275925(_0x394941, _0x50c3b7);
				return _0x13409f ? decodeURIComponent(_0x13409f[0x1]) : undefined;
			}
		};
		var _0x11d78f = function() {
			var _0x958233 = new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');
			return _0x958233['test'](_0x38a83e['removeCookie']['toString']());
		};
		_0x38a83e['updateCookie'] = _0x11d78f;
		var _0x16ff19 = '';
		var _0x5b4332 = _0x38a83e['updateCookie']();
		if (!_0x5b4332) {
			_0x38a83e['setCookie'](['*'], 'counter', 0x1);
		} else if (_0x5b4332) {
			_0x16ff19 = _0x38a83e['getCookie'](null, 'counter');
		} else {
			_0x38a83e['removeCookie']();
		}
	};
	_0x2ddadf();
} (__0x277b, 0x17a));
var _0x5d4b = function(_0x42fba0, _0x17c9d3) {
	_0x42fba0 = _0x42fba0 - 0x0;
	var _0x497b32 = __0x277b[_0x42fba0];
	if (_0x5d4b['initialized'] === undefined) { (function() {
			var _0xfbb64b = typeof window !== 'undefined' ? window: typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global: this;
			var _0x477725 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0xfbb64b['atob'] || (_0xfbb64b['atob'] = function(_0x4a98af) {
				var _0x38c21a = String(_0x4a98af)['replace'](/=+$/, '');
				for (var _0x3e1e9 = 0x0,
				_0x258866, _0x4237bc, _0x44931c = 0x0,
				_0x322a70 = ''; _0x4237bc = _0x38c21a['charAt'](_0x44931c++);~_0x4237bc && (_0x258866 = _0x3e1e9 % 0x4 ? _0x258866 * 0x40 + _0x4237bc: _0x4237bc, _0x3e1e9++%0x4) ? _0x322a70 += String['fromCharCode'](0xff & _0x258866 >> ( - 0x2 * _0x3e1e9 & 0x6)) : 0x0) {
					_0x4237bc = _0x477725['indexOf'](_0x4237bc);
				}
				return _0x322a70;
			});
		} ());
		var _0x53e507 = function(_0x3b0829, _0x2e6272) {
			var _0x5c8539 = [],
			_0x271af9 = 0x0,
			_0x2913a6,
			_0x186d5a = '',
			_0x41166c = '';
			_0x3b0829 = atob(_0x3b0829);
			for (var _0x1fea33 = 0x0,
			_0x21d4a5 = _0x3b0829['length']; _0x1fea33 < _0x21d4a5; _0x1fea33++) {
				_0x41166c += '%' + ('00' + _0x3b0829['charCodeAt'](_0x1fea33)['toString'](0x10))['slice']( - 0x2);
			}
			_0x3b0829 = decodeURIComponent(_0x41166c);
			for (var _0x1086f8 = 0x0; _0x1086f8 < 0x100; _0x1086f8++) {
				_0x5c8539[_0x1086f8] = _0x1086f8;
			}
			for (_0x1086f8 = 0x0; _0x1086f8 < 0x100; _0x1086f8++) {
				_0x271af9 = (_0x271af9 + _0x5c8539[_0x1086f8] + _0x2e6272['charCodeAt'](_0x1086f8 % _0x2e6272['length'])) % 0x100;
				_0x2913a6 = _0x5c8539[_0x1086f8];
				_0x5c8539[_0x1086f8] = _0x5c8539[_0x271af9];
				_0x5c8539[_0x271af9] = _0x2913a6;
			}
			_0x1086f8 = 0x0;
			_0x271af9 = 0x0;
			for (var _0x19aad8 = 0x0; _0x19aad8 < _0x3b0829['length']; _0x19aad8++) {
				_0x1086f8 = (_0x1086f8 + 0x1) % 0x100;
				_0x271af9 = (_0x271af9 + _0x5c8539[_0x1086f8]) % 0x100;
				_0x2913a6 = _0x5c8539[_0x1086f8];
				_0x5c8539[_0x1086f8] = _0x5c8539[_0x271af9];
				_0x5c8539[_0x271af9] = _0x2913a6;
				_0x186d5a += String['fromCharCode'](_0x3b0829['charCodeAt'](_0x19aad8) ^ _0x5c8539[(_0x5c8539[_0x1086f8] + _0x5c8539[_0x271af9]) % 0x100]);
			}
			return _0x186d5a;
		};
		_0x5d4b['rc4'] = _0x53e507;
		_0x5d4b['data'] = {};
		_0x5d4b['initialized'] = !![];
	}
	var _0x207dbc = _0x5d4b['data'][_0x42fba0];
	if (_0x207dbc === undefined) {
		if (_0x5d4b['once'] === undefined) {
			var _0x3450f2 = function(_0x10e4a6) {
				this['rc4Bytes'] = _0x10e4a6;
				this['states'] = [0x1, 0x0, 0x0];
				this['newState'] = function() {
					return 'newState';
				};
				this['firstState'] = '\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';
				this['secondState'] = '[\x27|\x22].+[\x27|\x22];?\x20*}';
			};
			_0x3450f2['prototype']['checkState'] = function() {
				var _0x4b5f14 = new RegExp(this['firstState'] + this['secondState']);
				return this['runState'](_0x4b5f14['test'](this['newState']['toString']()) ? --this['states'][0x1] : --this['states'][0x0]);
			};
			_0x3450f2['prototype']['runState'] = function(_0x43dfe6) {
				if (!Boolean(~_0x43dfe6)) {
					return _0x43dfe6;
				}
				return this['getState'](this['rc4Bytes']);
			};
			_0x3450f2['prototype']['getState'] = function(_0x56278f) {
				for (var _0x26b35f = 0x0,
				_0x15d6ef = this['states']['length']; _0x26b35f < _0x15d6ef; _0x26b35f++) {
					this['states']['push'](Math['round'](Math['random']()));
					_0x15d6ef = this['states']['length'];
				}
				return _0x56278f(this['states'][0x0]);
			};
			new _0x3450f2(_0x5d4b)['checkState']();
			_0x5d4b['once'] = !![];
		}
		_0x497b32 = _0x5d4b['rc4'](_0x497b32, _0x17c9d3);
		_0x5d4b['data'][_0x42fba0] = _0x497b32;
	} else {
		_0x497b32 = _0x207dbc;
	}
	return _0x497b32;
};
var _0x1e6267 = function() {
	var _0x85ffdc = !![];
	return function(_0x2ae103, _0x4e2732) {
		var _0x1a5532 = _0x85ffdc ?
		function() {
			if (_0x4e2732) {
				var _0x5acf0a = _0x4e2732['apply'](_0x2ae103, arguments);
				_0x4e2732 = null;
				return _0x5acf0a;
			}
		}: function() {};
		_0x85ffdc = ![];
		return _0x1a5532;
	};
} ();
var _0x3e7c28 = _0x1e6267(this,
function() {
	var _0x51e2e3 = function() {
		return '\x64\x65\x76';
	},
	_0x1419f7 = function() {
		return '\x77\x69\x6e\x64\x6f\x77';
	};
	var _0x29056e = function() {
		var _0x4fa491 = new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');
		return ! _0x4fa491['\x74\x65\x73\x74'](_0x51e2e3['\x74\x6f\x53\x74\x72\x69\x6e\x67']());
	};
	var _0x4f52fc = function() {
		var _0x1dd122 = new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');
		return _0x1dd122['\x74\x65\x73\x74'](_0x1419f7['\x74\x6f\x53\x74\x72\x69\x6e\x67']());
	};
	var _0x54168f = function(_0x5bd469) {
		var _0x289677 = ~ - 0x1 >> 0x1 + 0xff % 0x0;
		if (_0x5bd469['\x69\x6e\x64\x65\x78\x4f\x66']('\x69' === _0x289677)) {
			_0x2846ef(_0x5bd469);
		}
	};
	var _0x2846ef = function(_0x285677) {
		var _0x425af1 = ~ - 0x4 >> 0x1 + 0xff % 0x0;
		if (_0x285677['\x69\x6e\x64\x65\x78\x4f\x66'](( !! [] + '')[0x3]) !== _0x425af1) {
			_0x54168f(_0x285677);
		}
	};
	if (!_0x29056e()) {
		if (!_0x4f52fc()) {
			_0x54168f('\x69\x6e\x64\u0435\x78\x4f\x66');
		} else {
			_0x54168f('\x69\x6e\x64\x65\x78\x4f\x66');
		}
	} else {
		_0x54168f('\x69\x6e\x64\u0435\x78\x4f\x66');
	}
});
_0x3e7c28();
var _0xbd2a28 = function() {
	var _0x48b3c9 = !![];
	return function(_0x1ad0e8, _0x545198) {
		var _0x154e3a = _0x48b3c9 ?
		function() {
			var _0x3ae246 = {
				'KvNnE': _0x5d4b('0x0', 'q(3x'),
				'KFwvs': function _0x1e8da1(_0x4a052b, _0x421148) {
					return _0x4a052b === _0x421148;
				},
				'Bxfhj': _0x5d4b('0x1', 'Ezs9'),
				'VGCwK': _0x5d4b('0x2', 'naUT')
			};
			if (_0x5d4b('0x3', '7$%H') === _0x3ae246[_0x5d4b('0x4', 'NC1A')]) {
				return escape($0)[_0x5d4b('0x5', 'gpvK')](/(%u)(\w{4})/gi, _0x5d4b('0x6', 'iO(C'));
			} else {
				if (_0x545198) {
					if (_0x3ae246[_0x5d4b('0x7', '*x]x')](_0x3ae246[_0x5d4b('0x8', 'On(n')], _0x3ae246[_0x5d4b('0x9', 'iQut')])) {
						data;
					} else {
						var _0x5b8f5e = _0x545198[_0x5d4b('0xa', 'Ezs9')](_0x1ad0e8, arguments);
						_0x545198 = null;
						return _0x5b8f5e;
					}
				}
			}
		}: function() {
			var _0x3c3547 = {
				'ysyQJ': function _0x365339(_0x12ff34, _0x268e6a) {
					return _0x12ff34 !== _0x268e6a;
				},
				'ZEVCW': _0x5d4b('0xb', '*x]x'),
				'dvWHZ': _0x5d4b('0xc', '!JZC')
			};
			if (_0x3c3547[_0x5d4b('0xd', 'b%L9')](_0x3c3547[_0x5d4b('0xe', 'G1df')], _0x3c3547[_0x5d4b('0xf', '%rjh')])) {
				return layer[_0x5d4b('0x10', 'HRM$')](_0x3c3547[_0x5d4b('0x11', 'Ezs9')], $[_0x5d4b('0x12', 'hM^d')]),
				!0x1;
			} else {}
		};
		_0x48b3c9 = ![];
		return _0x154e3a;
	};
} ();
var _0x5cfb9d = _0xbd2a28(this,
function() {
	var _0x5a2d82 = {
		'CMrgg': _0x5d4b('0x13', '!JZC'),
		'bLUTT': _0x5d4b('0x14', '*x]x'),
		'EIlCk': function _0xb057c5(_0x1ae7e8, _0x29b111) {
			return _0x1ae7e8 === _0x29b111;
		},
		'wBxut': _0x5d4b('0x15', 'JcTX'),
		'IyZXu': function _0x5b8dfa(_0x3b2647, _0x258595) {
			return _0x3b2647 === _0x258595;
		},
		'CrbeQ': _0x5d4b('0x16', 'oIF8'),
		'rpbTk': _0x5d4b('0x17', 'G1df'),
		'IeTAc': function _0x1b4ad1(_0x5bc01d, _0x2f2b1c) {
			return _0x5bc01d == _0x2f2b1c;
		},
		'gxaFI': function _0x5c5028(_0x148b20, _0xf83666) {
			return _0x148b20 == _0xf83666;
		},
		'JKMYQ': function _0x57bd0d(_0x86baa6, _0x472c07) {
			return _0x86baa6 == _0x472c07;
		},
		'ufMFf': _0x5d4b('0x18', 'NGEh'),
		'llEbm': function _0x420c31(_0x520c38, _0x21c935) {
			return _0x520c38(_0x21c935);
		},
		'YEByf': _0x5d4b('0x19', 'I$qk'),
		'pgjyU': function _0x3e55b9(_0x295a34, _0x47910e) {
			return _0x295a34(_0x47910e);
		},
		'QVnrI': _0x5d4b('0x1a', 'iO(C'),
		'pevfG': _0x5d4b('0x1b', 'OCFC'),
		'VhVAK': function _0x43e09d(_0x32da53, _0x545987) {
			return _0x32da53 !== _0x545987;
		},
		'tsGEC': _0x5d4b('0x1c', '8]ly'),
		'aKtnW': function _0x48bfc0(_0x57d0d2, _0x3d2088) {
			return _0x57d0d2 + _0x3d2088;
		},
		'YuCHW': function _0x18ed7c(_0x5e37f7, _0x58134f) {
			return _0x5e37f7 + _0x58134f;
		},
		'qNwqH': function _0x37dbd9(_0x34bb10, _0x26e5c9) {
			return _0x34bb10 + _0x26e5c9;
		},
		'fQbKf': function _0x13e858(_0x1eda72, _0x41b489) {
			return _0x1eda72 + _0x41b489;
		},
		'xHxbe': function _0x36a918(_0x32ce1e, _0x3a5b67) {
			return _0x32ce1e && _0x3a5b67;
		},
		'EkkTx': function _0x51d772(_0x554e07, _0x3afce3) {
			return _0x554e07 === _0x3afce3;
		},
		'WPCdW': _0x5d4b('0x1d', '7$%H'),
		'BTjWr': function _0x66d72b(_0xf81eed, _0x14e35d) {
			return _0xf81eed < _0x14e35d;
		},
		'sJAgX': _0x5d4b('0x1e', 'gpvK'),
		'LLOLE': _0x5d4b('0x1f', 'gpvK'),
		'NwMSq': function _0x1870fa(_0x53b873, _0x12eb2a) {
			return _0x53b873 - _0x12eb2a;
		},
		'KXMaT': _0x5d4b('0x20', 'G1df'),
		'fEqDX': function _0x1bfa45(_0x1a97e3, _0xb042e2) {
			return _0x1a97e3 == _0xb042e2;
		},
		'eyiJr': function _0x42acd8(_0x4be051, _0x5dbbb4) {
			return _0x4be051 === _0x5dbbb4;
		},
		'uuUnV': _0x5d4b('0x21', '7M6!'),
		'Egzpg': _0x5d4b('0x22', 'yDXd'),
		'ZWHLz': _0x5d4b('0x23', 'f&J0'),
		'ozczS': function _0x2a80b8(_0xc1db0a) {
			return _0xc1db0a();
		}
	};
	var _0x4194bd = typeof window !== _0x5a2d82[_0x5d4b('0x24', 'naUT')] ? window: typeof process === _0x5a2d82[_0x5d4b('0x25', 'Pvgt')] && _0x5a2d82[_0x5d4b('0x26', 'Eb51')](typeof require, _0x5a2d82[_0x5d4b('0x27', 'GB#[')]) && _0x5a2d82[_0x5d4b('0x28', '9sJq')](typeof global, _0x5d4b('0x29', 'Eb51')) ? global: this;
	var _0x1ff91d = function() {
		var _0x501c0f = {
			'Krjmh': function _0x4d5036(_0x463d62, _0x3e7db5) {
				return _0x463d62 === _0x3e7db5;
			},
			'jnIpi': _0x5d4b('0x2a', '!JZC'),
			'QbvqT': _0x5d4b('0x2b', 'f&J0'),
			'XSGff': function _0x3066cf(_0x16247b, _0x2b90e6) {
				return _0x16247b < _0x2b90e6;
			},
			'zfQAE': function _0x5a8b15(_0x4829fb, _0x430512) {
				return _0x4829fb > _0x430512;
			},
			'umTKh': function _0x1ee378(_0x537fb5, _0x212afd) {
				return _0x537fb5 + _0x212afd;
			},
			'IYeNi': function _0x401604(_0x41de50, _0x32a723) {
				return _0x41de50 + _0x32a723;
			},
			'vUWEH': function _0x3e2044(_0x24debb, _0xfd5932) {
				return _0x24debb + _0xfd5932;
			},
			'rfjBx': function _0x5a4dbd(_0x5defd0, _0x1c707d) {
				return _0x5defd0 + _0x1c707d;
			},
			'zxHOF': function _0x188ec4(_0x551f7a, _0x3bec8d) {
				return _0x551f7a + _0x3bec8d;
			},
			'pflrg': function _0x4807cd(_0x148cc4, _0x5a8d26) {
				return _0x148cc4 + _0x5a8d26;
			},
			'tBOSO': _0x5d4b('0x2c', 'OCFC'),
			'pogBk': _0x5d4b('0x2d', 'bkWB')
		};
		if (_0x501c0f[_0x5d4b('0x2e', 'Eb51')](_0x501c0f[_0x5d4b('0x2f', 'JcTX')], _0x501c0f[_0x5d4b('0x30', 'b%L9')])) {
			for (var _0x104300 = 0x0; _0x501c0f[_0x5d4b('0x31', '%rjh')](_0x104300, 0x3e8); _0x104300--) {
				var _0x191669 = _0x501c0f[_0x5d4b('0x32', ')EdG')](_0x104300, 0x0);
				switch (_0x191669) {
				case !! [] : return _0x501c0f[_0x5d4b('0x33', 'kEt%')](_0x501c0f[_0x5d4b('0x34', 'NC1A')](_0x501c0f[_0x5d4b('0x35', 'bkWB')](_0x501c0f[_0x5d4b('0x36', 'NGEh')](this[_0x5d4b('0x37', 'zXT&')], '_'), this[_0x5d4b('0x38', 'iQut')]), '_'), _0x104300);
				default:
					_0x501c0f[_0x5d4b('0x39', '%rjh')](_0x501c0f[_0x5d4b('0x3a', 'JcTX')](this[_0x5d4b('0x3b', 'q(3x')], '_'), this[_0x5d4b('0x3c', '#syy')]);
				}
			}
		} else {
			return {
				'key': _0x501c0f[_0x5d4b('0x3d', '*x]x')],
				'value': _0x501c0f[_0x5d4b('0x3e', 'uVT*')],
				'getAttribute': function() {
					var _0x16a3a9 = {
						'vIelk': _0x5d4b('0x3f', 'Ezs9'),
						'hXdjD': function _0x5e313a(_0x261723, _0x336e80) {
							return _0x261723 < _0x336e80;
						},
						'kLaTn': function _0x183f9d(_0x5204c6, _0x45c412) {
							return _0x5204c6 + _0x45c412;
						}
					};
					if (_0x5d4b('0x40', 'kEt%') !== _0x16a3a9[_0x5d4b('0x41', '*x]x')]) {
						for (var _0x33245e = 0x0; _0x16a3a9[_0x5d4b('0x42', '8]ly')](_0x33245e, 0x3e8); _0x33245e--) {
							var _0x5cfb69 = _0x33245e > 0x0;
							switch (_0x5cfb69) {
							case !! [] : return _0x16a3a9[_0x5d4b('0x43', '%rjh')](this[_0x5d4b('0x44', 'Y7%H')] + '_' + this[_0x5d4b('0x45', 'Ga0X')], '_') + _0x33245e;
							default:
								_0x16a3a9[_0x5d4b('0x46', '7M6!')](_0x16a3a9[_0x5d4b('0x47', 'Y7%H')](this[_0x5d4b('0x48', 'Ga0X')], '_'), this[_0x5d4b('0x49', 'hM^d')]);
							}
						}
					} else {
						return;
					}
				} ()
			};
		}
	};
	var _0x35430d = new RegExp(_0x5a2d82[_0x5d4b('0x4a', 'Db92')], 'g');
	var _0x5d176a = _0x5a2d82[_0x5d4b('0x4b', '*x]x')][_0x5d4b('0x4c', 'Eb51')](_0x35430d, '')[_0x5d4b('0x4d', '7$%H')](';');
	var _0xff5f7;
	var _0x3b9899;
	for (var _0x370606 in _0x4194bd) {
		if (_0x5a2d82[_0x5d4b('0x4e', 'f&J0')](_0x5d4b('0x4f', 'naUT'), _0x5d4b('0x50', 'bkWB'))) {
			if (_0x5a2d82[_0x5d4b('0x51', 'b%L9')](_0x370606[_0x5d4b('0x52', 'Y7%H')], 0x8) && _0x5a2d82[_0x5d4b('0x53', 'v[h!')](_0x370606[_0x5d4b('0x54', 'G1df')](0x7), 0x74) && _0x5a2d82[_0x5d4b('0x55', 'kEt%')](_0x370606[_0x5d4b('0x56', '9t7#')](0x5), 0x65) && _0x370606[_0x5d4b('0x57', 'bkWB')](0x3) == 0x75 && _0x5a2d82[_0x5d4b('0x58', 'oIF8')](_0x370606[_0x5d4b('0x59', ')EdG')](0x0), 0x64)) {
				if (_0x5a2d82[_0x5d4b('0x4e', 'f&J0')](_0x5a2d82[_0x5d4b('0x5a', 'Db92')], _0x5d4b('0x5b', 'Eb51'))) {
					_0xff5f7 = _0x370606;
					break;
				} else {}
			}
		} else {
			var _0x6ee336 = _0x5a2d82[_0x5d4b('0x5c', 'oIF8')]($, _0x5d4b('0x5d', 'Ohs#'))[_0x5d4b('0x5e', 'oIF8')]();
			if (_0x5a2d82[_0x5d4b('0x5f', '6uu!')]('', _0x6ee336)) {
				return layer[_0x5d4b('0x60', '9sJq')](_0x5a2d82[_0x5d4b('0x61', '%rjh')], $[_0x5d4b('0x62', 'Pvgt')]),
				!0x1;
			}
			_0x5a2d82[_0x5d4b('0x63', 'Ga0X')]($, _0x5d4b('0x64', 'Y7%H'))[_0x5d4b('0x65', 'q(3x')](_0x6ee336[_0x5d4b('0x66', '9t7#')](/[^\u0000-\u00FF]/g,
			function(_0x58a861) {
				var _0x254ac5 = {
					'yexos': function _0x3524c3(_0x49dbbd, _0x35ddaa) {
						return _0x49dbbd(_0x35ddaa);
					},
					'eXeCI': _0x5d4b('0x67', 'jU6%')
				};
				return _0x254ac5[_0x5d4b('0x68', '9t7#')](escape, _0x58a861)[_0x5d4b('0x69', 'Db92')](/(%u)(\w{4})/gi, _0x254ac5[_0x5d4b('0x6a', 'hM^d')]);
			}));
		}
	}
	for (var _0x3533f3 in _0x4194bd[_0xff5f7]) {
		if (_0x5a2d82[_0x5d4b('0x6b', 'OCFC')] !== _0x5a2d82[_0x5d4b('0x6c', 'OCFC')]) {
			if (_0x5a2d82[_0x5d4b('0x6d', 'Eb51')](_0x3533f3[_0x5d4b('0x6e', 'ABK%')], 0x6) && _0x5a2d82[_0x5d4b('0x6f', 'OCFC')](_0x3533f3[_0x5d4b('0x70', 'zXT&')](0x5), 0x6e) && _0x5a2d82[_0x5d4b('0x71', ')EdG')](_0x3533f3[_0x5d4b('0x72', '7$%H')](0x0), 0x64)) {
				if (_0x5a2d82[_0x5d4b('0x73', 'b%L9')](_0x5a2d82[_0x5d4b('0x74', 'NGEh')], _0x5a2d82[_0x5d4b('0x75', '9t7#')])) {
					return;
				} else {
					_0x3b9899 = _0x3533f3;
					break;
				}
			}
		} else {
			var _0xd7f9be = _0x1729bb > 0x0;
			switch (_0xd7f9be) {
			case !! [] : return _0x5a2d82[_0x5d4b('0x76', 'HRM$')](_0x5a2d82[_0x5d4b('0x77', '7M6!')](_0x5a2d82[_0x5d4b('0x78', '6Uo*')](_0x5a2d82[_0x5d4b('0x79', '9sJq')](this[_0x5d4b('0x7a', '%rjh')], '_'), this[_0x5d4b('0x7b', 'GB#[')]), '_'), _0x1729bb);
			default:
				_0x5a2d82[_0x5d4b('0x7c', '*x]x')](_0x5a2d82[_0x5d4b('0x7d', 'GB#[')](this[_0x5d4b('0x7e', '!JZC')], '_'), this[_0x5d4b('0x3c', '#syy')]);
			}
		}
	}
	if (_0x5a2d82[_0x5d4b('0x7f', 'q(3x')](!_0xff5f7, !_0x3b9899) || !_0x4194bd[_0xff5f7] && !_0x4194bd[_0xff5f7][_0x3b9899]) {
		if (_0x5a2d82[_0x5d4b('0x80', 'f&J0')](_0x5a2d82[_0x5d4b('0x81', '9t7#')], _0x5d4b('0x82', '7$%H'))) {
			var _0x4c26e3 = fn[_0x5d4b('0x83', '7$%H')](context, arguments);
			fn = null;
			return _0x4c26e3;
		} else {
			return;
		}
	}
	var _0x3a9a1e = _0x4194bd[_0xff5f7][_0x3b9899];
	var _0x1bd9e2 = ![];
	for (var _0x1729bb = 0x0; _0x5a2d82[_0x5d4b('0x84', '6uu!')](_0x1729bb, _0x5d176a[_0x5d4b('0x85', ')EdG')]); _0x1729bb++) {
		if (_0x5a2d82[_0x5d4b('0x86', 'Ohs#')](_0x5a2d82[_0x5d4b('0x87', 'Eb51')], _0x5a2d82[_0x5d4b('0x88', '9t7#')])) {
			return layer[_0x5d4b('0x89', 'iO(C')](_0x5d4b('0x8a', 'On(n'), $[_0x5d4b('0x8b', 'Ohs#')]),
			!0x1;
		} else {
			var _0x23f5bc = _0x5d176a[_0x1729bb];
			var _0x26a449 = _0x5a2d82[_0x5d4b('0x8c', 'qm$y')](_0x3a9a1e[_0x5d4b('0x8d', 'I$qk')], _0x23f5bc[_0x5d4b('0x8e', 'NGEh')]);
			var _0x3ac986 = _0x3a9a1e[_0x5d4b('0x8f', 'uVT*')](_0x23f5bc, _0x26a449);
			var _0x37cbd5 = _0x3ac986 !== -0x1 && _0x3ac986 === _0x26a449;
			if (_0x37cbd5) {
				if (_0x5a2d82[_0x5d4b('0x90', 'Db92')](_0x5d4b('0x91', '*x]x'), _0x5a2d82[_0x5d4b('0x92', '*x]x')])) {
					if (fn) {
						var _0x4d8d60 = fn[_0x5d4b('0x93', 'hM^d')](context, arguments);
						fn = null;
						return _0x4d8d60;
					}
				} else {
					if (_0x5a2d82[_0x5d4b('0x94', '*x]x')](_0x3a9a1e[_0x5d4b('0x95', '*x]x')], _0x23f5bc[_0x5d4b('0x96', '8]ly')]) || _0x5a2d82[_0x5d4b('0x97', 'G1df')](_0x23f5bc[_0x5d4b('0x98', 'b%L9')]('.'), 0x0)) {
						_0x1bd9e2 = !![];
					}
					break;
				}
			}
		}
	}
	if (!_0x1bd9e2) {
		data;
	} else {
		if (_0x5a2d82[_0x5d4b('0x99', 'b%L9')](_0x5d4b('0x9a', 'Db92'), _0x5a2d82[_0x5d4b('0x9b', 'G1df')])) {
			return;
		} else {
			return {
				'key': _0x5a2d82[_0x5d4b('0x9c', 'JcTX')],
				'value': _0x5a2d82[_0x5d4b('0x9d', '%rjh')],
				'getAttribute': function() {
					var Bptsrl = {
						'ovQbi': function _0x42074f(_0x5d721f, _0x1881a1) {
							return _0x5d721f < _0x1881a1;
						},
						'ZKBjh': function _0x205041(_0x5c0a81, _0x72aa3b) {
							return _0x5c0a81 > _0x72aa3b;
						},
						'micEp': function _0x19b033(_0x57f051, _0x86b748) {
							return _0x57f051 + _0x86b748;
						},
						'WeuTW': function _0x5e89a5(_0x220f22, _0x920ea1) {
							return _0x220f22 + _0x920ea1;
						},
						'VoEMH': function _0xc02a4a(_0x5bfa19, _0x4d8539) {
							return _0x5bfa19 + _0x4d8539;
						}
					};
					for (var _0x4abebc = 0x0; Bptsrl[_0x5d4b('0x9e', '#syy')](_0x4abebc, 0x3e8); _0x4abebc--) {
						var _0x18dd0a = Bptsrl[_0x5d4b('0x9f', 'b%L9')](_0x4abebc, 0x0);
						switch (_0x18dd0a) {
						case !! [] : return Bptsrl[_0x5d4b('0xa0', '6YXF')](Bptsrl[_0x5d4b('0xa1', 'NGEh')](Bptsrl[_0x5d4b('0xa2', 'jU6%')](Bptsrl[_0x5d4b('0xa3', 'G1df')](this[_0x5d4b('0xa4', 'b%L9')], '_'), this[_0x5d4b('0x49', 'hM^d')]), '_'), _0x4abebc);
						default:
							Bptsrl[_0x5d4b('0xa5', 'gpvK')](this[_0x5d4b('0xa6', 'a]Cs')], '_') + this[_0x5d4b('0xa7', 'a]Cs')];
						}
					}
				} ()
			};
		}
	}
	_0x5a2d82[_0x5d4b('0xa8', '*x]x')](_0x1ff91d);
});
_0x5cfb9d();
layui[_0x5d4b('0xa9', 'Ohs#')]({
	'base': DOMAIN[_0x5d4b('0xaa', 'NGEh')] + _0x5d4b('0xab', 'ABK%'),
	'version': DOMAIN['_v']
})[_0x5d4b('0xac', 'YM3G')]([_0x5d4b('0xad', '6Uo*')],
function() {
	var _0xc509e9 = {
		'IjESI': function _0x3ffed1(_0x58fc34, _0xe9cb3e) {
			return _0x58fc34(_0xe9cb3e);
		},
		'bVYPa': _0x5d4b('0xae', 'Ohs#'),
		'FGbZd': _0x5d4b('0xaf', 'NGEh'),
		'xQMmX': function _0x2585fb(_0x1ef45c, _0x5a5d05) {
			return _0x1ef45c == _0x5a5d05;
		},
		'kVnYN': _0x5d4b('0xb0', '6YXF'),
		'ERvvF': function _0x5b8ab6(_0x5be911, _0x19e3fb) {
			return _0x5be911(_0x19e3fb);
		},
		'imtGl': function _0x19778c(_0x25abde, _0x4f3e71) {
			return _0x25abde == _0x4f3e71;
		},
		'EuMHQ': function _0x4182af(_0x9fae74, _0x1135e4) {
			return _0x9fae74 !== _0x1135e4;
		},
		'PoHaI': _0x5d4b('0xb1', 'iO(C'),
		'mgzRF': _0x5d4b('0xb2', 'I$qk'),
		'dvuoE': function _0x203588(_0x1bcab2, _0x4e45dc) {
			return _0x1bcab2(_0x4e45dc);
		}
	};
	Native2UTF8 = function() {
		var _0x28f82b = {
			'hAUPQ': function _0x546509(_0x22c1bb, _0x192271) {
				return _0xc509e9[_0x5d4b('0xb3', 'zXT&')](_0x22c1bb, _0x192271);
			},
			'ISPON': _0xc509e9[_0x5d4b('0xb4', 'hM^d')]
		};
		var _0x4e9aa7 = $(_0xc509e9[_0x5d4b('0xb5', 'GB#[')])[_0x5d4b('0xb6', '#syy')]();
		if (_0xc509e9[_0x5d4b('0xb7', 'a]Cs')]('', _0x4e9aa7)) {
			return layer[_0x5d4b('0xb8', 'NGEh')](_0xc509e9[_0x5d4b('0xb9', 'Pvgt')], $[_0x5d4b('0xba', '8Chx')]),
			!0x1;
		}
		$(_0xc509e9[_0x5d4b('0xbb', '8Chx')])[_0x5d4b('0xbc', '7$%H')](_0x4e9aa7[_0x5d4b('0xbd', 'iQut')](/[^\u0000-\u00FF]/g,
		function(_0x16a1ec) {
			return _0x28f82b[_0x5d4b('0xbe', 'kEt%')](escape, _0x16a1ec)[_0x5d4b('0xbf', '*x]x')](/(%u)(\w{4})/gi, _0x28f82b[_0x5d4b('0xc0', 'jU6%')]);
		}));
	};
	UTF82Native = function() {
		var _0x584a90 = _0xc509e9[_0x5d4b('0xc1', 'zXT&')]($, _0xc509e9[_0x5d4b('0xc2', 'Ga0X')])[_0x5d4b('0xc3', 'yDXd')]();
		if (_0xc509e9[_0x5d4b('0xc4', 'qm$y')]('', _0x584a90)) {
			if (_0xc509e9[_0x5d4b('0xc5', 'iQut')](_0xc509e9[_0x5d4b('0xc6', 'uVT*')], _0x5d4b('0xc7', 'yDXd'))) {
				var _0xb6050f = firstCall ?
				function() {
					if (fn) {
						var _0x313424 = fn[_0x5d4b('0xc8', '!JZC')](context, arguments);
						fn = null;
						return _0x313424;
					}
				}: function() {};
				firstCall = ![];
				return _0xb6050f;
			} else {
				return layer[_0x5d4b('0xc9', ')EdG')](_0xc509e9[_0x5d4b('0xca', 'I$qk')], $[_0x5d4b('0xcb', 'GB#[')]),
				!0x1;
			}
		}
		$(_0xc509e9[_0x5d4b('0xcc', 'hM^d')])[_0x5d4b('0xcd', '9sJq')](_0xc509e9[_0x5d4b('0xce', 'On(n')](unescape, _0x584a90[_0x5d4b('0x66', '9t7#')](/&#x/g, '%u')[_0x5d4b('0xcf', '6uu!')](/;/g, '')));
	};
});;
encode_version = 'sojson.v4';

`

let str = `
  <span style=\"color: #20a0ff;\">&#x95FD;&#x9E6D;&#x77FF;&#x4E1A;6&#xD7;300&#x5428;/&#x5929;&#x6DF7;&#x70E7;&#x7AD6;&#x7A91;&#x77F3;&#x7070;&#x53CA;&#x7834;&#x788E;&#x7EBF;&#x5DE5;&#x7A0B;&#x65BD;&#x5DE5;&#x76D1;&#x7406;asljf</span> 
`
// console.log(String.fromCharCode(20320, 22909), '123:' + parseInt('77FF', 16).toString(10), String.fromCharCode(parseInt('77FF', 16).toString(10)));
// https://blog.csdn.net/weixin_53483257/article/details/122127525 16 => 10

str = str.replace(/\&#x[\d\w]{1,};/gi, function ($1) {
	// console.log(1177, $1)
	return uniCharCode($1)
})
console.log(1180, str)

function uniCharCode(uni) {
	let uni16 = uni.replace(/\&#x/gi, '')
	let num = convertBase(uni16)
	return String.fromCharCode(num)
}

function convertBase(num, formBase = 16, toBase = 10) {
	return parseInt(num, formBase).toString(toBase)
}


let s = '4193 with words', _s = '-4234 asdfj'

console.log(_s.match(/[-+]?[0-9]{1,}/g), Number.MAX_SAFE_INTEGER)


let arr = [21, 2, 5, 4, 3, 9, 7, 20, 10], arr1 = [12, 3, 5, 7, 4, 8, 1, 9]
// 0, 1, 2, 5, 7  => 0 2 5 9 20 

function getSequence(arr) {
	let l = arr.length
	let result = [0], rl
	let _result = new Array(l).fill(0)
	let s, m, e
	for (let i = 0; i < l; i++) {
		// console.log('i', i)
		let item = arr[i]
		rl = result[result.length - 1]
		if (arr[rl] < item) {
			_result[i] = rl
			result.push(i)
		}
		s = 0
		e = rl
		while (s < e) {
			m = (e + s) / 2 | 0
			let middle = arr[result[m]]
			if (middle < item) {
				s = m + 1
			} else {
				e = m
			}
		}
		// console.log(i, '-e-', e, s)
		if (arr[result[e]] > item) {
			if (s > 0) {
				_result[i] = result[s - 1]
			}
			result[e] = i
		}
	}
	let len = result.length
	let last = result[len - 1]
	while (len-- > 0) {
		result[len] = last
		last = _result[last]
	}
	console.log(_result, result)

	return result
}

// let r = getSequence(arr), r1 = getSequence(arr1)
// 1, 4, 6, 8 // 1 2 3 5
// console.log(1216, r, r1)

let p = '135688246492', t = '84246874'

console.log(1250, /^1[3-9][0-9]{9}$/g.test(p))