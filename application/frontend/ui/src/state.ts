import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { Action, Example, LOCK, UNLOCK, UPDATE_OUTPUT, UPDATE_EXAMPLES, SELECT_EXAMPLE, UPDATE_CODE, CLEAR_OUTPUT, UPDATE_VERSIONS, TOGGLE_PERMISSION, SELECT_VERSION } from './actions'

export interface Permissions {
    [key: string]: boolean
}

export interface ApplicationState {
    output: string,
    name: string,
    locked: boolean,
    examples: Array<Example>
    selectedExample: number,
    url: string,
    code: string,
    version: number,
    permissions: Permissions,
    versions: Array<string>
}

const defaultState: ApplicationState = {
    output: '// output',
    name: 'Deno playground',
    locked: false,
    examples: [],
    selectedExample: -1,
    url: 'http://deno-play.app',
    code: '',
    version: 0,
    permissions: {
        net: false,
        read: false,
        write: false,
        run: false,
        env: false
    },
    versions: []
};

function reducer(state = defaultState, action: Action): ApplicationState {

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
        case CLEAR_OUTPUT:
            return Object.assign({}, state, { output: '// loading...' });
        case UPDATE_VERSIONS:
            return Object.assign({}, state, { versions: action.versions });
        case TOGGLE_PERMISSION:
            return Object.assign({}, state, { permissions: Object.assign({}, state.permissions, { [action.permission]: !state.permissions[action.permission] }) });
        case SELECT_VERSION:
            return Object.assign({}, state, { version: action.version });
        default:
            return state;
    }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
