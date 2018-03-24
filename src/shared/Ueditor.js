import React from 'react';
import UE from '../../ueditor/ueditor.all';

class Ueditor extends React.Component {
  static defaultProps = {
    config: {}
  }

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.initEditor()
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }

  initEditor() {
    const { id, config } = this.props;
    const ueEditor = UE.getEditor(this.props.id, config);
    const self = this;

    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
    })
  }

  render(){
    return (
      <div id={this.props.id} name="content" type="text/plain"></div>
    )
  }
}
export default Ueditor;