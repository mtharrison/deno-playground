import * as React from 'react';
import { connect } from 'react-redux'

import Editor from './editor'
import Output from './output'
import { ApplicationState } from '../state'

interface AppProps {
    name: string
}

const App = (props: AppProps) => {

    return (
        <div className="container">
            <header>
                <img width="80px" src="/images/deno.svg" alt={props.name}/>
                <h1>{props.name}</h1>
            </header>
            <div className="main">
                <Editor />
                <Output />
            </div>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ name: state.name });

export default connect(mapStateToProps)(App)
