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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
