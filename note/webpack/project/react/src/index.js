import React from 'react'
import ReactDom from 'react-dom'

import '../style/index.css'
import '../style/index.less'
import '../style/index.scss'
import '../style/index.styl'

import jdImg from '../assets/images/jd.jpg'
const logoImg = require('../assets/images/logo.png')
class App extends React.Component {
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
    return (
      <div>

        <h1>Hello </h1>
        <img src={jdImg} alt='jdImg' />
        <img src={logoImg} alt='logoImg' />
        <img src={require('../assets/images/user-avatar.jpg')} alt='userImg' />
        <i className='iconfont txuanzhongshangcheng'></i>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))