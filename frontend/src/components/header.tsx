import * as React from 'react';
import { connect } from 'react-redux'

import { ApplicationState } from '../state'

interface HeaderProps {
    name: string,
    url: string
}

const Header = (props: HeaderProps) => {

    return (
        <header>
            <a href={props.url}><img width="80px" src="/images/deno.svg" alt={props.name}/></a>
            <a href={props.url}><h1>{props.name}</h1></a>
            <ul>
                <li><a href="http://" target="_blank" rel="noopener noreferrer">About</a></li>
                <li><a href="http://" target="_blank" rel="noopener noreferrer">Contribute</a></li>
            </ul>
        </header>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ name: state.name, url: state.url });

export default connect(mapStateToProps)(Header)



