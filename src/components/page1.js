import React from 'react'
import Ueditor from '../shared/Ueditor.js'

export default class Page1 extends React.Component {

  state ={
    data: ''
  }

  testSubmit = () => {
    const data = UE.getEditor('content').getContent()
    this.setState({ data })
  }

  render(){
    return(
      <div>
        <Ueditor  id="content" height="200" /> 
        <button onClick={this.testSubmit}>保存</button>
        <p>{this.state.data}</p>
      </div>
    )
  }
};
