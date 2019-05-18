import * as React from 'react';
import Strip from 'strip-ansi'

import Editor from './editor'
import Output from './output'

const defaultState = {
    output: '....',
    code: `setInterval(() => {\n    let i = 0;\n\tconsole.log('hello ' + i++);\n}, 1000)`,
    name: 'Deno playground',
    locked: false
};

export default class App extends React.Component<any, {}> {

    public state = defaultState;

    onExecute(code: string) {

        this.setState({ locked: true });

        fetch('/execute', { method: 'POST', body: code })
        .then((response) => {

            let text = '';
            const reader = response.body.getReader()
            const decoder = new TextDecoder();

            const readChunk = (): {} => reader.read().then(appendChunks);

            const appendChunks = (result: ReadableStreamReadResult<Uint8Array>): {} => {
                var chunk = decoder.decode(result.value || new Uint8Array(0), { stream: !result.done });
                text += chunk;
                this.setState({ output: Strip(text).trim() });
                if (result.done) {
                    this.setState({ locked: false });
                } else {
                    return readChunk();
                }
            }

            return readChunk();
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm">
                        <div className="header">
                            <img width="100px" src="/images/deno.svg" alt={this.state.name}/>
                            <h1>{this.state.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Editor locked={this.state.locked} code={this.state.code} onExecute={this.onExecute.bind(this)} />
                    <Output output={this.state.output}/>
                </div>
            </div>
        );
    }
}
