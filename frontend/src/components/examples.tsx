import * as React from 'react';
import { connect } from 'react-redux'

import { ApplicationState } from '../state'
import { Example, selectExample } from '../actions'

interface ExamplesProps {
    examples: Array<Example>,
    selected: number
    selectExample: () => any
}

const Examples = (props: ExamplesProps) => {

    return (
        <div className="examples-container">
           <label htmlFor="examples">Load Example:</label>
            <select name="examples" id="examples" value={props.selected} onChange={props.selectExample}>
                <option value="-1"></option>
                {props.examples.map((value, index) => {
                    return <option value={index} key={index}>{value.name}</option>
                })}
            </select>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ examples: state.examples, selected: state.selectedExample });
const mapDispatchToProps = { selectExample };

export default connect(mapStateToProps, mapDispatchToProps)(Examples)
