import * as React from 'react';
import { connect } from 'react-redux'

import { ApplicationState } from '../state'

const Output = (props: any) => {

    return (
        <div className="col-sm">
            <p>Output</p>
            <pre className="blue-bg" id="output">{props.output}</pre>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ output: state.output });

export default connect(mapStateToProps)(Output)
