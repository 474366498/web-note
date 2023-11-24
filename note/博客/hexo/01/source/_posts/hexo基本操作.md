---
title: hexo基本操作
date: 2023-11-10 10:28:35
tags:
---

### 项目中
*** hexo-asset-image *** 
> [解决hexo引用本地图片无法显示的问题](https://juejin.cn/post/7006594302604214280)
> 在使用中 修改了 node_modules/hexo-asset-image/index.js 中src具体内容 

```yml 
  ...
  ## 资源文件夹
  post_asset_folder: true 
  marked:
    prependRoot: true
    postAsset: true

  ...

``` 

``` javascript 
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('after_post_render', function (data) {
  var config = hexo.config;
  if (config.post_asset_folder) {
    var link = data.permalink;
    var beginPos = getPosition(link, '/', 3) + 1;
    var appendLink = '';
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    // if not with index.html endpos = link.lastIndexOf('.') + 1 support hexo-abbrlink
    if (/.*\/index\.html$/.test(link)) {
      // when permalink is end with index.html, for example 2019/02/20/xxtitle/index.html
      // image in xxtitle/ will go to xxtitle/index/
      appendLink = 'index/';
      var endPos = link.lastIndexOf('/');
    }
    else {
      var endPos = link.lastIndexOf('.');
    }
    link = link.substring(beginPos, endPos) + '/' + appendLink;

    var toprocess = ['excerpt', 'more', 'content'];
    for (var i = 0; i < toprocess.length; i++) {
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function () {
        if ($(this).attr('src')) {
          // For windows style path, we replace '\' to '/'.
          var src = $(this).attr('src').replace('\\', '/');
          if (!(/http[s]*.*|\/\/.*/.test(src)
            || /^\s+\//.test(src)
            || /^\s*\/uploads|images\//.test(src))) {
            // For "about" page, the first part of "src" can't be removed.
            // In addition, to support multi-level local directory.
            var linkArray = link.split('/').filter(function (elem) {
              return elem != '';
            });
            var srcArray = src.split('/').filter(function (elem) {
              return elem != '' && elem != '.';
            });
            if (srcArray.length > 1)
              srcArray.shift();
            src = srcArray.join('/');

            // $(this).attr('src', config.root + link + src);
            let srcSplit = src.split('/')   // 进行了修改
            let _src = srcSplit[srcSplit.length - 1]   // 进行了修改
            $(this).attr('src', './' + _src);   // 进行了修改
            console.info && console.info('link', link, '------', src , _src )
            console.info && console.info("update link as:-->" + config.root + link + src);
          }
        } else {
          console.info && console.info("no src attr, skipped...");
          console.info && console.info($(this));
        }
      });
      data[key] = $.html();
    }
  }
});



```



#### hexo 基本操作

*** 修改 _config.yml ***  

``` javascript 
# Site
title: '蒋彬'
subtitle: '个人博客'
description: ''
keywords:
author: John Doe
language: en
timezone: ''
.....

```
*** Deployment 模块 *** 

``` javascript 

# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: ''

# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git 
  repository : git 上传 地址
  branch : git 上传分支

```
> type,repository,branch三个关健字，前面都有两个空格，冒号后面有一个空格，这里不能把空格删掉
> type和branch后面的值都是固定的，repository后面的值，需要到github上找你创建的那个仓库，点击Code按钮，复制git的链接。（为了后面提交代码方便，尽量复制git链接，而不是https链接）


``` bash
$ hexo clean 清除缓存
$ hexo generate 生成静态页面 
$ hexo deploy 部署
$ hexo server 本地预览
$ hexo new '文件名' 新建博客文章

```

#### 相关插件 

``` bash 
$ npm install hexo-bridge 需要安装的插件名称，输入命令：
$ npm install hexo-deployer-git --save  自动安装部署
$ npm install hexo-asset-image --save  hexo自动处理了添加的图片
$ npm install --save hexo-deployer-git hexo针对git的deploy组件

``` 

#### 其它操作

``` bash 
rm -rf .deploy_git /  删除git提交内容文件夹
git config --global core.autocrlf false  
hexo clean 
hexo g 
hexo d 

```



#### 相关文章介绍
1. [在github上搭建个人独立博客](https://blog.csdn.net/tlb203/article/details/128619163)
2. [利用Github DIY自己的个人博客](https://zhuanlan.zhihu.com/p/550709268)
3. [hexo给文章插入图片、进行图片样式控制](https://blog.51cto.com/u_15477117/4919656)
4. [hexo文件参数及其相关说明](https://www.jianshu.com/p/d1dedae4d970)
5. [Hexo-Next 主题选择以及自定义配置](https://zhuanlan.zhihu.com/p/606484894?utm_id=0)

# https://474366498.github.io/


1 内容放错分支，只有在master分支里面的内容才能用github.io查看到

2 仓库名称不对   github用户名.github.io 必须是这个名字

3 如果以上方法都没用（这很正常）

这是starkflow上一个大哥的神方法：

在 根目录下创立一个docs文件夹 里面放一个CNAME文件 不用写任何内容 也没文件后缀

然后重新 git push到你的仓库里面

123