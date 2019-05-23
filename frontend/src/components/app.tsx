import * as React from 'react';
import { connect } from 'react-redux'

import Editor from './editor'
import Examples from './examples'
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
                <ul>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">About</a></li>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">Contribute</a></li>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">What is Deno?</a></li>
                </ul>
            </header>
            <div className="toolbar">
                <label htmlFor="examples">Load Example:</label>
                <select name="examples" id="examples">
                    <option value="1">Example 1</option>
                    <option value="2">Example 2</option>
                    <option value="3">Example 3</option>
                    <option value="4">Example 4</option>
                    <option value="5">Example 5</option>
                </select>
                <p>Permissions</p>
                <div className="permissions">
                    <label htmlFor="allow-read">--allow-read</label>
                    <input type="checkbox" name="allow-read" id="allow-read"/>

                    <label htmlFor="allow-read">--allow-write</label>
                    <input type="checkbox" name="allow-read" id="allow-write"/>

                    <label htmlFor="allow-read">--allow-exec</label>
                    <input type="checkbox" name="allow-exec" id="allow-exec"/>

                    <label htmlFor="allow-read">--allow-net (loopback)</label>
                    <input type="checkbox" name="allow-exec" id="allow-net"/>
                </div>
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

const mapStateToProps = (state: ApplicationState) => ({ name: state.name });

export default connect(mapStateToProps)(App)
