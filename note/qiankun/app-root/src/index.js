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
  },
  {
    name: 'html-micro',
    entry: 'http://localhost:8083',
    container: '#root',
    activeRule: '/html-micro',
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
