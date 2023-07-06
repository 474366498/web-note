import React from 'react'
import ReactDom from 'react-dom'
import TsComponent from './component'
import '../style/index.css'
import '../style/index.less'
import '../style/index.scss'
import '../style/index.styl'


import "antd/dist/reset.css";

import { Router, Route } from 'react-router-dom'



import { Button } from 'antd'

import jdImg from '../assets/images/jd.jpg'
const logoImg = require('../assets/images/logo.png')

console.log(21, Router, Route)
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jdImg,
      logoImg,

    }
  }
  render() {
    console.log(18, this.state)
    let { jdImg, logoImg, } = this.state
    const imgStyle = { width: '100px', height: 'auto' }
    return (
      <div>

        <h1>Hello </h1>
        <img style={imgStyle} src={jdImg} alt='jdImg' />
        <img style={imgStyle} src={logoImg} alt='logoImg' />
        <img style={imgStyle} src={require('../assets/images/user-avatar.jpg')} alt='userImg' />
        <TsComponent></TsComponent>
        <i className='iconfont txuanzhongshangcheng'></i>
        <Button type="primary"> Button </Button>
      </div>
    )
  }
}

export default Home