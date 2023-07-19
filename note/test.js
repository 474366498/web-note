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