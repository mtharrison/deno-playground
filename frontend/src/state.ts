import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { Action, Example, LOCK, UNLOCK, UPDATE_OUTPUT, UPDATE_EXAMPLES, SELECT_EXAMPLE, UPDATE_CODE } from './actions'

export interface ApplicationState {
    output: string,
    name: string,
    locked: boolean,
    examples: Array<Example>
    selectedExample: number,
    url: string,
    code: string,
}

const defaultState: ApplicationState = {
    output: '// output',
    name: 'Deno playground',
    locked: false,
    examples: [],
    selectedExample: -1,
    url: 'http://deno-play.app',
    code: ''
};

function reducer(state = defaultState, action: Action): ApplicationState {

    console.log(action);

    switch (action.type) {
        case LOCK:
            return Object.assign({}, state, { locked: true });
        case UNLOCK:
            return Object.assign({}, state, { locked: false });
        case UPDATE_OUTPUT:
            return Object.assign({}, state, { output: action.output });
        case UPDATE_EXAMPLES:
            return Object.assign({}, state, { examples: action.examples });
        case SELECT_EXAMPLE:
            return Object.assign({}, state, { selectedExample: action.selected });
        case UPDATE_CODE:
            return Object.assign({}, state, { code: action.code });
        default:
            return state;
    }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
