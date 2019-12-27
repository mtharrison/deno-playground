import * as React from 'react';
import { connect } from 'react-redux'

import Examples from './examples'
import Editor from './editor'
import Header from './header'
import Output from './output'
import Versions from './versions'
import Permissions from './permissions'
import { ApplicationState } from '../state'

interface AppProps {
    version: number
}

const App = (props: AppProps) => {

    return (
        <div className="container">

            <Header />

            <div className="toolbar">
                <Examples />
                <Versions />
                <Permissions />
            </div>

            <div className="main">
                <Editor />
                <Output />
            </div>

            <footer>
                <p>Made with ♥ by <a href="https://twitter.com/mt_harrison">@mt_harrison</a></p>
            </footer>

        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    version: state.version
});

export default connect(mapStateToProps)(App)
