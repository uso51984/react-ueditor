import React from 'react'
import Ueditor from '../../src'

const value = '<p><a style="font-family: &quot;PingFang SC&quot;; font-size: medium; white-space: normal;">受控设置value值</a></p>';
export default class Page1 extends React.Component {
  state ={
    data: ''
  }

  onChange = (value) => {
    this.ueditorValue = value;
    console.log('onChange', this.ueditorValue)
  }

  onBlur = (value) => {
    this.ueditorValue = value;
    console.log('onBlur', this.ueditorValue)
  }

  render(){
    return(
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            this.setState({ data: value })
          }}
        >
        设置value值
        </button>

        <Ueditor onChange={this.onChange} value={this.state.data} />
        <p>{this.state.data}</p>
      </div>
    )
  }
};
