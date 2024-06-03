

![JS_console.log()的进阶使用_console打印控制台样式_编码图案](https://blog.csdn.net/weixin_44599931/article/details/108578353)

| 占位符 | 作用 |
|:----|:----------:|
|%s| 字符串|
|%d or %i | 整数 |
| %f | 浮点数|
| %o |可展开的DOM|
|%O| 列出DOM的属性 |
|%c| 根据提供的css样式格式化字符串|

![console.log()花样打印](https://www.cnblogs.com/liao123/p/14233034.html)

``` javascript
console.log('我的document是：%o',document)
```
![效果1.png](https://img2020.cnblogs.com/blog/1412174/202101/1412174-20210104223144144-1803685740.png)

``` javascript
console.log('%c 我的document是：%o','color:red',document)
```
![效果2.png](https://img2020.cnblogs.com/blog/1412174/202101/1412174-20210104223300111-1359018446.png)

*** 更多玩法 *** 
``` html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0, user-scalable=no">
    <title>控制打印样式</title>
</head>
<body>
<script type="text/javascript">

    console.log("%cAltering the text color", "color: fuchsia"); //文本颜色

    console.log(
        "%c字体的多样化显示",
        "background-color: fuchsia ; color: white ; font-weight: bold ; " +
        "font-size: 20px ; font-style: italic ; text-decoration: underline ; " +
        "font-family: 'american typewriter' ; text-shadow: 1px 1px 3px black ;"
    ); //字体的多样化显示


    console.log(
        "%c给文本加上边框",
        "display: inline-block ; border: 3px solid red ; border-radius: 7px ; " +
        "padding: 10px ; margin: 20px ;"
    );//边框样式

    console.log(
        "%c背景图片",
        "display: inline-block ; background-image: url( 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612363383&t=9672c03657ad4a95d026f8a512979328' ) ; " +
        "background-size: cover ; padding: 10px 175px 158px 10px ; " +
        "border: 2px solid black ; font-size: 11px ; line-height: 11px ; " +
        "font-family: monospace ;"
    ); //显示一张背景图片

    //相同的CSS样式可以与许多其他控制台方法一起使用，例如.group（）方法。
    //创建一个组
    console.group("%c组内容输出", "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;");
    //分组输出
    console.log("我是组里面的内容1");
    console.log("我是组里面的内容2");
    console.log("我是组里面的内容3");
    //结束
    console.groupEnd();
</script>
</body>
</html>

```
我们只是试图在各种语句中投放大量CSS，console.log()以查看它们所支持的内容。并且，当我们在Chrome中运行上述代码时，在控制台输出如下：

![更多.png](https://img2020.cnblogs.com/blog/1412174/202101/1412174-20210104224825877-1477235350.png)


``` javascript 
// 为了让这个更好用一点，我将创建一个echo对象来代替console。意思是，它将具有受控制台启发的方法

// 创建一个日志记录API，其中包含一些特殊的格式信息。
var echo = (function () {
    var queue = [];
    var ECHO_TOKEN = {};
    var RESET_INPUT = "%c ";
    var RESET_CSS = "";
    function alertFormatting(value) {
        
        queue.push({
            value: value,
            css: "display: inline-block ; background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });
        return (ECHO_TOKEN);
    }
    function warningFormatting(value) {
        queue.push({
            value: value,
            css: "display: inline-block ; background-color: gold ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
        });
        return (ECHO_TOKEN);
    }

    function using(consoleFunction) {
        function consoleFunctionProxy() {
            var inputs = [];
            var modifiers = [];
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === ECHO_TOKEN) {
                    var item = queue.shift();
                    inputs.push(("%c" + item.value), RESET_INPUT);
                    modifiers.push(item.css, RESET_CSS);
                    // 对于其他所有参数类型，直接输出值。
                } else {
                    var arg = arguments[i];
                    if ((typeof (arg) === "object") || (typeof (arg) === "function")) {
                        inputs.push("%o", RESET_INPUT);
                        modifiers.push(arg, RESET_CSS);
                    } else {
                        inputs.push(("%c" + arg), RESET_INPUT);
                        modifiers.push(RESET_CSS, RESET_CSS);
                    }
                }
            }
            consoleFunction(inputs.join(""), ...modifiers);
            // 全部输出后，清空队列。
            queue = [];
        }
        return (consoleFunctionProxy);
    }

    return ({
        // 控制台功能。
        log: using(console.log),
        warn: using(console.warn),
        error: using(console.error),
        trace: using(console.trace),
        group: using(console.group),
        groupEnd: using(console.groupEnd),
        // 格式化功能。
        asAlert: alertFormatting,
        asWarning: warningFormatting
    });

})();
// 混合打印
echo.log(
    echo.asAlert("我是错误"),
    "哈哈哈",
    {"我": "是一个对象"},
    null,
    ["我是一个数组"],
    function amAFunction() { //方法
    },
    echo.asWarning("我是警告")
);
echo.log();
// 测试打印
echo.group(echo.asWarning("周星驰·功夫"));
echo.log("主演：周星驰");
echo.log("类型", echo.asAlert("喜剧!"), echo.asWarning("动作"));
echo.log("2004年");
echo.log("票房", echo.asWarning("1.73亿"));
echo.groupEnd();
echo.log();
echo.log(echo.asAlert("多重打印"), "我是外层");

```
![echo效果.png](https://img2020.cnblogs.com/blog/1412174/202101/1412174-20210104231703759-1986509809.png)