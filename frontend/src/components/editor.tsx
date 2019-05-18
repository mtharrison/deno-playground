import * as React from 'react';
import * as Ace from 'ace-builds'
import { connect } from 'react-redux'

import { ApplicationState } from '../state'
import { execute } from '../actions'

interface EditorProps {
    execute: (code: string) => any;
    code: string,
    locked: boolean
}

class Editor extends React.Component<EditorProps> {

    componentDidMount() {

        const editor = Ace.edit("code");
        editor.setHighlightActiveLine(false);
        editor.setShowPrintMargin(false);
    }

    render() {
        return (
            <div className="editor-container">
                <p>Code</p>
                <pre className="blue-bg" id="code" contentEditable>{this.props.code}</pre>
                <button onClick={() => this.props.execute(this.props.code)} type="button" className="btn">{this.props.locked ? '...' : 'Execute'}</button>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    locked: state.locked,
    code: state.code
});

const mapDispatchToProps = ({ execute });

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
