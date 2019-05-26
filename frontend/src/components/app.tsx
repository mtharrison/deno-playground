import * as React from 'react';
import { connect } from 'react-redux'

import Examples from './examples'
import Editor from './editor'
import Header from './header'
import Output from './output'
import Permissions from './permissions'
import { ApplicationState } from '../state'

interface AppProps {
    version: string
}

const App = (props: AppProps) => {

    return (
        <div className="container">

            <Header />

            <div className="toolbar">
                <Examples />
                <Permissions />
            </div>

            <div className="main">
                <Editor />
                <Output />
            </div>

            <footer>
                <p>Made with ♥ by <a href="http://twitter/mt_harrison">@mt_harrison</a> | {props.version}</p>
            </footer>

        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    version: state.version
});

export default connect(mapStateToProps)(App)
