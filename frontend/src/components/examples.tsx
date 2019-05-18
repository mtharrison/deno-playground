import * as React from 'react';
import { connect } from 'react-redux'

class Examples extends React.Component {


    render() {
        return (
            <div className="examples-container">
                <ul>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">Example 1</a></li>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">Example 2</a></li>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">Example 3</a></li>
                    <li><a href="http://" target="_blank" rel="noopener noreferrer">Example 4</a></li>
                </ul>
            </div>
        );
    }
}

export default connect()(Examples)
