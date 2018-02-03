import React from 'react'

import AceEditor from 'react-ace';

import 'brace/mode/csharp';
import 'brace/theme/solarized_light';
import 'brace/theme/monokai';


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
    }
  }

  handleOnChange(contents) {
    this.setState({ contents })
  }

  handleOnSubmit(e) {
    this.props.submitCode(this.state.contents);
  }

  componentDidMount() {
    const { contents } = this.props.selectedQuestion;
    this.setState({ contents });
  }

  componentWillReceiveProps(nextProps) {
    const { contents } = nextProps.selectedQuestion;
    this.setState({ contents });
  }

  render () {
    let { info } = this.props.selectedQuestion;
    
    if(info && info.file_path) {
      var splitPath = info.file_path.split('/');
      var file_name = splitPath[splitPath.length - 1];
    }
   
    return (
      <div>
        <div id="editor-header" className="editor-header">
          <code>{ file_name }</code>
        </div>
        <div>
          <AceEditor
            mode="csharp"
            theme="monokai"
            name="blah2"
            onLoad={this.onLoad}
            onChange={(v) => this.handleOnChange(v)}
            fontSize={18}
            width="803.25px"
            height="100px"
            minLines={20}
            maxLines={23}
            editorProps={{$blockScrolling: true}}
            value={this.state.contents}
            enableBasicAutocompletion= {false}
            enableLiveAutocompletion= {false}
            enableSnippets= {false}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              fontFamily:"Inconsolata",
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </div>
        <div className="editor-footer">
          <div className="editor-buttons-container">
            <button 
              className="btn btn-success"
              onClick={e => this.handleOnSubmit(e)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default Editor;
