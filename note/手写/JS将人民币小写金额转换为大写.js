
/** 数字金额大写转换(可以处理整数,小数,负数) */
function smalltoBIG(n) {
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);

  var s = '';

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 将阿拉伯数字金额转换成中文金额大写
 */
function MoneyToBig(Num) {
  console.log(5, Num)
  for (i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(",", "")//替换tomoney()中的“,”
    Num = Num.replace(" ", "")//替换tomoney()中的空格
  }
  Num = Num.replace("￥", "")//替换掉可能出现的￥字符
  if (isNaN(Num)) {
    //验证输入的字符是否为数字
    alert("请检查小写金额是否正确！");
    return;
  }
  //---字符处理完毕，开始转换，转换采用前后两部分分别转换---//
  part = String(Num).split(".");
  newchar = "";
  //小数点前进行转化
  for (i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) { alert("抱歉！位数过大,无法计算自动生成。"); return ""; }//若数量超过拾亿单位，提示
    tmpnewchar = ""
    perchar = part[0].charAt(i);
    switch (perchar) {
      case "0": tmpnewchar = "零" + tmpnewchar; break;
      case "1": tmpnewchar = "壹" + tmpnewchar; break;
      case "2": tmpnewchar = "贰" + tmpnewchar; break;
      case "3": tmpnewchar = "叁" + tmpnewchar; break;
      case "4": tmpnewchar = "肆" + tmpnewchar; break;
      case "5": tmpnewchar = "伍" + tmpnewchar; break;
      case "6": tmpnewchar = "陆" + tmpnewchar; break;
      case "7": tmpnewchar = "柒" + tmpnewchar; break;
      case "8": tmpnewchar = "捌" + tmpnewchar; break;
      case "9": tmpnewchar = "玖" + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
      case 0: tmpnewchar = tmpnewchar + "元"; break;
      case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
      case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
      case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
      case 4: tmpnewchar = tmpnewchar + "万"; break;
      case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
      case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
      case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
      case 8: tmpnewchar = tmpnewchar + "亿"; break;
      case 9: tmpnewchar = tmpnewchar + "拾"; break;
    }
    newchar = tmpnewchar + newchar;
  }
  //小数点之后进行转化
  if (Num.indexOf(".") != -1) {
    if (part[1].length > 2) {
      part[1] = part[1].substr(0, 2)
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = ""
      perchar = part[1].charAt(i)
      switch (perchar) {
        case "0": tmpnewchar = "零" + tmpnewchar; break;
        case "1": tmpnewchar = "壹" + tmpnewchar; break;
        case "2": tmpnewchar = "贰" + tmpnewchar; break;
        case "3": tmpnewchar = "叁" + tmpnewchar; break;
        case "4": tmpnewchar = "肆" + tmpnewchar; break;
        case "5": tmpnewchar = "伍" + tmpnewchar; break;
        case "6": tmpnewchar = "陆" + tmpnewchar; break;
        case "7": tmpnewchar = "柒" + tmpnewchar; break;
        case "8": tmpnewchar = "捌" + tmpnewchar; break;
        case "9": tmpnewchar = "玖" + tmpnewchar; break;
      }
      if (i == 0) tmpnewchar = tmpnewchar + "角";
      if (i == 1) tmpnewchar = tmpnewchar + "分";
      newchar = newchar + tmpnewchar;
    }
  }
  //替换所有无用汉字
  while (newchar.search("零零") != -1)
    newchar = newchar.replace("零零", "零");
  newchar = newchar.replace("零亿", "亿");
  newchar = newchar.replace("亿万", "亿");
  newchar = newchar.replace("零万", "万");
  newchar = newchar.replace("零元", "元");
  newchar = newchar.replace("零角", "");
  newchar = newchar.replace("零分", "");

  if (newchar.charAt(newchar.length - 1) == "元" || newchar.charAt(newchar.length - 1) == "角")
    newchar = newchar + "整"
  return newchar;
}

console.log(smalltoBIG(123131.123), MoneyToBig('123131.123'))  //壹拾贰万叁仟壹佰叁拾壹元壹角贰分 壹拾贰万叁仟壹佰叁拾壹元壹角贰分