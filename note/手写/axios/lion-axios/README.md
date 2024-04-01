# lion-axios

[!手写 axios 库并发布至 npm 线上完整过程 ](https://juejin.cn/post/6914138611789070349?searchId=202403291448187B0F99009497EC504C56#heading-12)
lion-axios 是一个基于 promise 的 HTTP 库，学习 axios lib 源码而产生。

# 启动项目

- 开发时执行 npm run dev 命令；
- 打包时执行 npm run build 命令。

# 错误信息

1.

```
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:133:10)

```

node 版本太高了 用 node 14.1.0
解决方式 => https://blog.csdn.net/qian____/article/details/130485011
