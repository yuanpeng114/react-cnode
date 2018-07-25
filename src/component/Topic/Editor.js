import React from 'react';
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';

class Editor extends React.Component{
  constructor(props){
    super(props);
    this.getValue = this.getValue.bind(this);
  }
  getValue(value){
    if(value){
      this.simplemde.value(value);
    }
    return this.simplemde.value();
  }
  componentDidMount(){
    this.simplemde = new SimpleMDE({
        element: document.getElementById('editor'),
        spellChecker: false, //拼写检查
        autoDownloadFontAwesome: false, //加载字体样式
    });
    this.props.value(this.getValue);
  }
  render(){
    return (
        <textarea id="editor"></textarea>
    )
  }
}

export default Editor;
