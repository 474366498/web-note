import React from 'react'
import ReactDom from 'react-dom'

import '../style/index.css'
import '../style/index.less'
import '../style/index.scss'
import '../style/index.styl'


import "antd/dist/reset.css";

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './home'

console.log(21, BrowserRouter, Routes, Route)

// class Home extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }
//   render() {
//     return (<h1>Home</h1>)
//   }
// }

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (<h1>About</h1>)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {

    return (
      <BrowserRouter>
        <section>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
          </ul>
        </section>
        <section>
          <Routes>
            <Route path='/' element={<Home />} > </Route>
            <Route path='/about' element={<About />} > </Route>
          </Routes>
        </section>
      </BrowserRouter>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))