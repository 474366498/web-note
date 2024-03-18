// import { Component, useState } from 'react';
// import ReactDOM from 'react-dom';
import { Component, useState } from './mini/react'
import ReactDOM from './mini/react-dom';
import './index.css';


// https://juejin.cn/post/7030673003583111176



class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div className="class-component" onClick={this.addCount}>
        <div><a href='https://juejin.cn/post/7030673003583111176#heading-1'>手把手教你实现史上功能最丰富的简易版 react </a></div>
        <div>this is a class Component</div>
        <div>state count value is: {this.state.count}</div>
        <div>prop value is: {this.props.value}</div>
      </div>
    );
  }
}

function FunctionComponent(props) {
  let [num, setNum] = useState(1)
  // const addCount = () => {
  //   setNum(num + 1)
  // }
  console.log(29, num)
  return (
    <div className="function-component" onClick={() => setNum(num + 1)}>
      <div>this is a function Component</div>
      <div>use state num : {num}</div>
      <div>prop value is: {props.value} </div>
    </div>
  );
}
const classes = () => {
  return ['a', 'b', 'c'].join(' ')
}

var jsx

jsx = (
  <div className="deep1-box">
    <ClassComponent value={666} />
    <FunctionComponent value={100} />
    <div className="deep2-box-1">
      <a href="https://github.com/zh-lx/mini-react">mini react link</a>
      <p style={{ color: 'red' }}> this is a red p</p>
      <div className="deep3-box">
        {true && <div className={true ? 'yy cc' : ' cc'}>condition true</div>}
        {false && <div>condition false</div>}
        <input
          type="button"
          value="say hello"
          onClick={() => {
            alert('hello');
          }}
        />
      </div>
    </div>
    <div className="deep2-box-2">
      {['item1', 'item2', 'item3'].map((item) => (
        <li className={classes()} key={item}>{item}</li>
      ))}
    </div>
  </div>
);
console.log(61, jsx)
ReactDOM.render(jsx, document.getElementById('root'));


// setTimeout(() => {
//   jsx = (
//     <div className="deep1-box">
//       <ClassComponent value={666} />
//       <FunctionComponent value={100} />
//     </div>
//   )
//   ReactDOM.render(jsx, document.getElementById('root'));
// }, 5e3);