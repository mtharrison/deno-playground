import * as React from 'react';
import { connect } from 'react-redux'

import { ApplicationState } from '../state'
import { selectVersion } from '../actions'

interface VersionsProps {
    versions: Array<string>,
    version: number
    selectVersion: () => any
}

const Versions = (props: VersionsProps) => {

    return (
        <div className="examples-container">
           <label htmlFor="examples">Select Version:</label>
            <select name="examples" id="examples" value={props.version} onChange={props.selectVersion}>
                {props.versions.map((value, index) => {
                    return <option value={index} key={index}>{value}</option>
                })}
            </select>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ versions: state.versions, version: state.version });
const mapDispatchToProps = { selectVersion };

export default connect(mapStateToProps, mapDispatchToProps)(Versions)
