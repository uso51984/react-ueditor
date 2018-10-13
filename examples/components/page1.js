import React from 'react'
import Ueditor from '../../src'

export default class Page1 extends React.Component {
  state ={
    data: ''
  }

  onChange = (value) => {
    this.setState({ data: value })
  }

  render(){
    return(
      <div>
        <Ueditor onChange={this.onChange} />
        <p>{this.state.data}</p>
      </div>
    )
  }
};
