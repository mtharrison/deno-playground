import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { Action, LOCK, UNLOCK, UPDATE_OUTPUT } from './actions'

export interface ApplicationState {
    output: string,
    code: string,
    name: string,
    locked: boolean
}

const defaultState: ApplicationState = {
    output: '...',
    code: `setInterval(() => {\n    let i = 0;\n\tconsole.log('hello ' + i++);\n}, 1000)`,
    name: 'Deno playground',
    locked: false
};

function reducer(state = defaultState, action: Action): ApplicationState {

    switch (action.type) {
        case LOCK:
            return Object.assign({}, state, { locked: true });
        case UNLOCK:
            return Object.assign({}, state, { locked: false });
        case UPDATE_OUTPUT:
            return Object.assign({}, state, { output: action.output });
        default:
            return state;
    }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
