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