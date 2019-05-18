import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { ApplicationState, Action, ActionType, UpdatedOutputAction } from './types'

const defaultState: ApplicationState = {
    output: '....',
    code: `setInterval(() => {\n    let i = 0;\n\tconsole.log('hello ' + i++);\n}, 1000)`,
    name: 'Deno playground',
    locked: false
};

function reducer(state = defaultState, action: Action): ApplicationState {

    console.log(action);

    switch (action.type) {
        case ActionType.Lock:
            return Object.assign({}, state, { locked: true });
        case ActionType.Unlock:
            return Object.assign({}, state, { locked: false });
        case ActionType.UpdatedOutput:
            return Object.assign({}, state, { output: (action as UpdatedOutputAction).output });
        default:
            return state;
    }
}

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
