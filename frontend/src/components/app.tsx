import * as React from 'react';
import { connect } from 'react-redux'

import Examples from './examples'
import Editor from './editor'
import Header from './header'
import Output from './output'
import { ApplicationState } from '../state'

const App = () => {

    return (
        <div className="container">

            <Header />

            <div className="toolbar">
                <Examples />
            </div>

            <div className="main">
                <Editor />
                <Output />
            </div>

            <footer>
                <p>Made with ♥ by <a href="http://twitter/mt_harrison">@mt_harrison</a></p>
            </footer>

        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    name: state.name,
    examples: state.examples,
    selected: state.selectedExample
});

export default connect(mapStateToProps)(App)
