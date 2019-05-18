import * as React from 'react';
import * as Ace from 'ace-builds'

export default class Editor extends React.Component<any, any> {

    componentDidMount() {

        const editor = Ace.edit("code");
        editor.setHighlightActiveLine(false);
        editor.setShowPrintMargin(false);
    }

    onClick(e: React.MouseEvent<HTMLElement>) {

        e.preventDefault();

        if (this.props.locked) {
            return;
        }

        this.props.onExecute(this.props.code);
    }

    render() {
        return (
            <div className="col-sm">
                <p>Code</p>
                <pre className="blue-bg" id="code" contentEditable>{this.props.code}</pre>
                <button onClick={(e) => this.onClick(e)} type="button" id="executeButton" className="btn btn-dark btn-lg">{this.props.locked ? '...' : 'Execute'}</button>
            </div>
        );
    }
}
