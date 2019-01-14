import React from 'react'
import Ueditor from '../../src'

const value = '<p><a style="font-family: &quot;PingFang SC&quot;; font-size: medium; white-space: normal;">受控设置value值</a></p>';
export default class Page1 extends React.Component {
  state ={
    initValue: '',
    nowValue: ''
  }

  onChange = (value) => {
    this.ueditorValue = value;
    console.log('onChange', this.ueditorValue)
    this.setState({ nowValue: value });
  }

  onBlur = (value) => {
    this.ueditorValue = value;
    this.setState({ nowValue: value });
    console.log('onBlur', this.ueditorValue)
  }

  render(){
    return(
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            this.setState({ initValue: '设置value值' })
          }}
        >
        设置value值
        </button>

        <Ueditor onChange={this.onChange} onBlur={this.onBlur} value={this.state.initValue} />
        <p>{this.state.nowValue}</p>
      </div>
    )
  }
};
