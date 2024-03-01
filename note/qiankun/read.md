## qiankun 

### 主应用 (react)

  1. npm i qiankun 主应用安装 

  2. 添加微应用列表(数组) 并在修改应用入口(src/index.js)

  ``` javascript 

      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import './index.css';
      import App from './App';
      import reportWebVitals from './reportWebVitals';

      import { registerMicroApps, start } from 'qiankun'

      const { log } = console

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );

      // If you want to start measuring performance in your app, pass a function
      // to log results (for example: reportWebVitals(console.log))
      // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
      reportWebVitals();



      // qiankun 

      const apps = [
        {
          name: 'react-micro',
          entry: 'http://localhost:8081',
          container: '#root',
          activeRule: '/react-micro',
          props: null
        },
        {
          name: 'vue3-micro',
          entry: 'http://localhost:8080',
          container: '#root',
          activeRule: '/vue3-micro',
          props: {}
        },
        {
          name: 'vue2-micro',
          entry: 'http://localhost:8001',
          container: '#root',
          activeRule: '/vue2-micro',
          props: {}
        }
      ]
      console.log(33, apps)

      registerMicroApps(apps, {
        beforeLoad: () => {
          log('load before')
        },
        beforeMount: () => {
          log('mount before')
        },
        afterMount: () => {
          log('mount after')
        }
      })

      start()



  ``` 

### vue 2 ~ 3 全是通过vue-cli进行创建的 
  1. 都在package.json 中添加了字段内容
  
  *** package.json ***
  ```json 
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ],
      "globals": {
        "__webpack_public_path__": true  // 添加字段 
      }
    },

  ```

  2. 通过在package.json中添加的内容 创建js在 vue入口main.js、ts中引用

  *** src/public-path.js *** 

  ``` javascript 
    if (window.__POWERED_BY_QIANKUN__) {
      __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
    }

  ```
  3. 在入口文件引用 并更改入口文件 添加qiankun生命周期函数

  *** vue2 ~ src/main.js ***

  ```javascript 

      import './public-path'
      import Vue from 'vue'
      import App from './App.vue'
      import VueRouter from 'vue-router'

      Vue.config.productionTip = false

      var router = null, instance = null;
      var routes = []
      function render(props = {}) {
        const { container } = props
        router = new VueRouter({
          base: window.__POWERED_BY_QIANKUN__ ? `${props?.name}` : '/',
          mode: 'history',
          routes: routes ? routes : []
        })
        Vue.use(router)
        console.log(19, container)
        instance = new Vue({
          router,
          render: h => h(App)
        }).$mount(container ? container.querySelector('#vue2-app') : '#vue2-app')
      }

      if (!window.__POWERED_BY_QIANKUN__) {
        render()
      }

      export async function bootstrap() {
        console.log(`vue2 bootstrap`)
      }

      export async function mount(props) {

        console.log('mount', props)
        render(props)
      }

      export async function unmount() {
        instance.$destroy()
        instance.$el.innerHTML = ''
        instance = null
        router = null
      }


  ```

  
  *** vue3 ~ src/main.js ***

  ```javascript 

    // import './public-path' vue3 没有引用 public-path 
    import { createApp } from 'vue'
    import { createRouter, createWebHistory } from 'vue-router'
    import App from './App.vue'


    var router = null,
      instance = null,
      history = null
    var routes = []

    function render(props = {}) {
      const { container } = props
      history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? `${props.name}` : '/')
      router = createRouter({
        history,
        routes: routes ? routes : []
      })
      instance = createApp(App)
      instance.use(router)
      instance.mount(container ? container.querySelector('#vue3-app') : '#vue3-app')
    }

    if (!window.__POWERED_BY_QIANKUN__) {
      render()
    }

    export async function bootstrap() {
      console.log('%c', 'color:green', 'vue3 bootstrap')
    }

    export async function mount(props) {
      console.log('mount', props)
      render(props)
    }

    export async function unmount() {
      instance && instance.unmount()
      instance._container.innerHTML = ''
      instance = null
      router = null
      history.destroy()
    }



  ```


  4. 在develop 环境下启用 

  *** vue.config.js vue2 vue2 基本相同 *** 

  ``` javascript 
  
    const path = require("path");
    const { name } = require("./package");

    function resolve(dir) {
      return path.join(__dirname, dir);
    }

    module.exports = {
      filenameHashing: true,
      lintOnSave: process.env.NODE_ENV !== "production",
      runtimeCompiler: true,
      productionSourceMap: false,
      devServer: {
        hot: true,
        // disableHostCheck: true,
        port: 8001,
        // overlay: {
        //   warnings: false,
        //   errors: true,
        // },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
      // 自定义webpack配置
      configureWebpack: {
        resolve: {
          alias: {
            "@": resolve("src"),
          },
        },
        // 让主应用能正确识别微应用暴露出来的一些信息
        output: {
          library: `${name}-[name]`,
          libraryTarget: "umd", // 把子应用打包成 umd 库格式
          chunkLoadingGlobal: `webpackJsonp_${name}`,
        },
      },
    };

 

  ```


### react 
  1. react 开发版本基本都是17 没有用到最新(23年4月)18的版本 在package.json中同样添加全局字段

  *** package.json *** 

  ``` json 
    "dependencies": {
      "@rescripts/cli": "^0.0.16",
      "@testing-library/jest-dom": "^5.11.4",
      "@testing-library/react": "^11.1.0",
      "@testing-library/user-event": "^12.1.10",
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
      "react-router-dom": "5.0",
      "react-scripts": "^4.0.3",
      "web-vitals": "^2.1.4"
    },
    "scripts": {
      "start": "set PORT=8081 && react-scripts start",
      "pass": "set NODE_OPTIONS=--openssl-legacy-provider && set PORT=8081 && rescripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ],
      "globals": {
        "__webpack_public_path__": true
      }
    },

  ```
  > 在script 脚本中使用 react-scripts 进行运行启动 

  2. 在入口文件中也添加 public-path.js 

  *** src/public-path.js *** 

  ``` javascript 

      console.log('public_path')
      if (window.__POWERED_BY_QIANKUN__) {
        __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
      }

  ```

  3. react 入口文件(index.js) 修改

  ``` javascript 

        import React from 'react';
        import ReactDOM from 'react-dom/';
        import { BrowserRouter } from 'react-router-dom'
        import './index.css';
        import './public_path'
        import App from './App';
        import reportWebVitals from './reportWebVitals';

        var root

        function render(props: any) {
          let container = props ? props.container.querySelector('#react-app') : document.getElementById('react-app')
          // container.innerHTML = 'why why '
          root = ReactDOM.render(
            <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react-micro' : '/'}>
              <App />
            </BrowserRouter>
            , container);
          console.log(root)
        }

        if (!window.__POWERED_BY_QIANKUN__) {
          render()
        }



        export async function bootstrap() {
          console.log('react app bootstraped');
        }


        export async function mount(props) {
          console.log('props from main framework', props);
          render(props)
          // render(props);
          // props.onGlobalStateChange((state: any, prev: any) => {
          //   console.log('子应用监听');
          // });
        }

        export async function unmount() {
          // const { container } = props;
          ReactDOM.unmountComponentAtNode(
            document.querySelector('#react-app')
          );
        }

        export async function update() {
          console.log('update props');
        }

        reportWebVitals();


  ``` 

  4. 启动环境修改

  *** .rescriptsrc.js (根目录下新建) *** 

  ``` javascript 

        const { name } = require('./package.json')

        module.exports = {
          webpack: config => {
            config.output.library = `${name}-[name]`
            config.output.libraryTarget = 'umd'
            config.output.jsonpFunction = `webpackJsonp_${name}`
            config.output.globalObject = 'window'
            return config
          },
          devServer: _ => {
            const config = _

            config.headers = {
              'Access-Control-Allow-Origin': '*'
            }

            config.historyApiFallback = true
            config.hot = false
            config.watchContentBase = false
            config.liveReload = false

            return config
          }
        }

  ```



  
