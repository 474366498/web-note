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
