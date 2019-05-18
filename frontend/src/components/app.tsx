import * as React from 'react';
import { connect } from 'react-redux'

import Editor from './editor'
import Output from './output'
import { ApplicationState } from '../types'

interface AppProps {
    name: string
}

const App = (props: AppProps) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <div className="header">
                        <img width="100px" src="/images/deno.svg" alt={props.name}/>
                        <h1>{props.name}</h1>
                    </div>
                </div>
            </div>
            <div className="row">
                <Editor />
                <Output />
            </div>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ name: state.name });

export default connect(mapStateToProps)(App)
