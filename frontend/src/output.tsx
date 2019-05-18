import * as React from 'react';

export default class Output extends React.Component<any> {
    render() {
        return (
            <div className="col-sm">
                <p>Output</p>
                <pre className="blue-bg" id="output">{this.props.output}</pre>
            </div>
        );
    }
}
