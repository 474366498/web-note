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


let query = `invoiceType=3&data=%7B%22invoicePeople%22:%22%E5%94%90%E7%BB%9C%22,%22invoiceUnit%22:%22%E5%85%A8%E5%92%A8%E9%83%A8%22,%22invoiceDate%22:%222023-08-19%2013:50:54%22,%22invoiceProject%22:%22%E4%B8%AD%E5%9B%BD%E8%9E%8D%E9%80%9A%E5%8C%BB%E7%96%97%E5%81%A5%E5%BA%B7%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E9%99%A2%E5%8C%BA%E7%BB%BC%E5%90%88%E6%95%B4%E6%B2%BB%E5%85%A8%E8%BF%87%E7%A8%8B%E5%B7%A5%E7%A8%8B%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1%E2%80%94%E6%B2%88%E9%98%B3%E5%8C%97%E6%96%B9%E5%8C%BB%E9%99%A2%22,%22invoicePaymentMethods%22:%5B%22%E7%BD%91%E9%93%B6%22,%22%E8%BD%AC%E6%94%AF%22,%22%E7%8E%B0%E9%87%91%22,%22%E5%85%B6%E4%BB%96%22%5D,%22invoicePaymentMethod%22:0,%22collectionUnit%22:%22%E6%88%B4%E4%B8%9C%E6%96%B0%22,%22collectionBank%22:%22%E4%B8%AD%E5%9B%BD%E5%BB%BA%E8%AE%BE%E9%93%B6%E8%A1%8C%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E6%B2%88%E9%98%B3%E9%9D%92%E5%B1%B1%E8%B7%AF%E6%94%AF%E8%A1%8C%22,%22collectionBankCard%22:%226227%200007%203140%200084%20433%22,%22invoiceBusinessData%22:%5B%7B%22businessNumber%22:%221%22,%22businessDescribe%22:%22%E6%88%BF%E5%B1%8B%E7%A7%9F%E9%87%91%EF%BC%882023-9-10%E8%87%B32024-3-9%EF%BC%891900*6=11400%22,%22businessBills%22:0,%22businessTotal%22:11400%7D,%7B%22businessNumber%22:%222%22,%22businessDescribe%22:%22%E7%A8%8E%E9%87%911013.97%22,%22businessBills%22:0,%22businessTotal%22:1013.97%7D,%7B%22businessNumber%22:%223%22,%22businessDescribe%22:%22%22,%22businessBills%22:0,%22businessTotal%22:0%7D%5D,%22invoiceRemark%22:%22%22,%22invoiceCheckData%22:%5B%7B%22invoiceCheckType%22:%22%E5%85%A8%E5%92%A8%E9%A1%B9%E7%9B%AE%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E9%99%88%E9%B8%BF%E5%BF%97%22,%22invoiceCheckDate%22:%222023-08-23%2001:22:22%22%7D,%7B%22invoiceCheckType%22:%22%E9%80%A0%E4%BB%B7%E9%83%A8%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E5%BE%90%E5%89%91%22,%22invoiceCheckDate%22:%222023-08-23%2010:15:07%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E7%BB%8F%E7%90%86%22,%22invoiceCheckIdea%22:%22%E5%BE%90%E8%8D%A3%E8%8E%89%22,%22invoiceCheckDate%22:%222023-08-23%2013:25:10%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E6%80%BB%E7%9B%91%22,%22invoiceCheckIdea%22:%22%E9%BB%84%E6%96%87%E4%BF%8A%22,%22invoiceCheckDate%22:%222023-08-24%2013:36:05%22%7D,%7B%22invoiceCheckType%22:%22%E8%B4%A2%E5%8A%A1%E6%80%BB%E7%9B%91%22,%22invoiceCheckIdea%22:%22%E7%8E%8B%E6%88%90%E8%89%B3%22,%22invoiceCheckDate%22:%222023-08-24%2014:10:06%22%7D,%7B%22invoiceCheckType%22:%22%E8%91%A3%E4%BA%8B%E9%95%BF%22,%22invoiceCheckIdea%22:%22%E7%8E%8B%E6%95%A6%E4%BC%9F%22,%22invoiceCheckDate%22:%222023-08-25%2020:53:10%22%7D%5D,%22invoiceAccessory%22:%223%22,%22invoiceTotalLower%22:12413.97%7D`
var code = 0;
var tempData = {};
var vars = query.split("&");
// console.log(vars)
for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split("=");
  if (pair[0] == "invoiceType") {
    code = parseInt(pair[1]);
  }
  if (pair[0] == "data") {
    tempData = pair[1];
  }
}

// console.log(519, decodeURI(tempData))

// {"invoicePeople":"唐络","invoiceUnit":"全咨部","invoiceDate":"2023-08-19 13:50:54","invoiceProject":"中国融通医疗健康集团有限公司院区综合整治全过程工程咨询服务—沈阳北方医院","invoicePaymentMethods":["网银","转支","现金","其他"],"invoicePaymentMethod":0,"collectionUnit":"戴东新","collectionBank":"中国建设银行股份有限公司沈阳青山路支行","collectionBankCard":"6227 0007 3140 0084 433","invoiceBusinessData":[{"businessNumber":"1","businessDescribe":"房屋租金（2023-9-10至2024-3-9）1900*6

// {"invoicePeople":"唐络","invoiceUnit":"全咨部","invoiceDate":"2023-08-19 13:39:42","invoiceProject":"中国融通医疗集团医疗健康集团有限公司院区综合整治全过程工程咨询服务-沈阳一二一医院","invoicePaymentMethods":["网银","转支","现金","其他"],"invoicePaymentMethod":0,"collectionUnit":"唐络","collectionBank":"中国工商银行草市支行","collectionBankCard":"6212264402083690143","invoiceBusinessData":[{"businessNumber":"1","businessDescribe":"租房电费","businessBills":0,"businessTotal":117.5},{"businessNumber":"2","businessDescribe":"与院领导吃饭，买皮尺（50米）卷尺","businessBills":0,"businessTotal":340},{"businessNumber":"3","businessDescribe":"沈阳市交通费（沈阳市政务中心及皇姑区证务中心，皇姑局人防办、规划局，皇姑区政务中心咨询报规报建、沈阳勘察测绘院办理市政雨污手续）","businessBills":0,"businessTotal":382}],"invoiceRemark":"","invoiceCheckData":[{"invoiceCheckType":"全咨项目经理","invoiceCheckIdea":"陈鸿志","invoiceCheckDate":"2023-08-23 01:15:30"},{"invoiceCheckType":"造价部经理","invoiceCheckIdea":"徐剑","invoiceCheckDate":"2023-08-23 10:16:08"},{"invoiceCheckType":"财务专员","invoiceCheckIdea":"陈佼","invoiceCheckDate":"2023-08-23 13:18:41"},{"invoiceCheckType":"财务总监","invoiceCheckIdea":"黄文俊","invoiceCheckDate":"2023-08-24 13:33:07"},{"invoiceCheckType":"财务总监","invoiceCheckIdea":"王成艳","invoiceCheckDate":"2023-08-24 14:10:43"}],"invoiceAccessory":"1","invoiceTotalLower":839.5}

// var data = JSON.parse(decodeURI(tempData));
// console.log(517, tempData, data)



let names = [
  '微信图片_20230831105958.png',
  "123123.png",
  "u&gp=0.jpg",
  "20200925160951746.png",
  "陈秀英5月社保.jpg",
  "index.png",
  "timg (3).jpg"
]


names.forEach(name => {
  let match = name.match(/(\d{1,4})\W*\.\w{1,}$/)
  console.log(543, match, match ? match[1] : 0)
})

// let sortMatch = item.name.match(/(\d{1,4})\W*\.\w{1,}$/)
// let sortNo = sortMatch && sortMatch[1] ? sortMatch[1] : 9999


// let sortMatch = item.name.match(/(\d{1,4})\W*\.\w{1,}$/)
// let sortNo = item.sortNo || (sortMatch && sortMatch[1] ? sortMatch[1] : 9999)









