import * as React from 'react';
import * as Ace from 'ace-builds'
import { connect } from 'react-redux'

import { ApplicationState } from '../state'
import { execute, updateCode } from '../actions'

interface EditorProps {
    execute: (code: string) => any,
    updateCode: (code: string) => any,
    code: string,
    locked: boolean,
}

class Editor extends React.Component<EditorProps> {

    editor: any

    componentDidMount() {
        this.editor = Ace.edit("code");
        this.editor.setHighlightActiveLine(false);
        this.editor.setShowPrintMargin(false);

        this.editor.setOptions({
            fontFamily: 'monospace',
            fontSize: '14px'
        });

        document.getElementById('root')
            .addEventListener('keydown', (e) => {

            if (e.keyCode === 13 &&
                (e.metaKey === true || e.ctrlKey === true)) {

                this.props.execute(this.editor.getValue());
            }
        });
    }

    componentDidUpdate(prevProps: EditorProps) {
        if (prevProps.code != this.props.code) {
            this.editor.setValue(this.props.code, -1);
        }
    }

    render() {
        return (
            <div className="editor-container">
                <pre className="blue-bg" id="code" contentEditable></pre>
                <button onClick={() => this.props.execute(this.editor.getValue())} type="button" className="btn">{this.props.locked ? '...' : 'Execute'}</button>
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    locked: state.locked,
    code: state.code
});

const mapDispatchToProps = ({ execute, updateCode });

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
