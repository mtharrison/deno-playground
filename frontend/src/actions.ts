import { Dispatch } from 'redux';
import Strip from 'strip-ansi'

// Action types

export const LOCK = 'LOCK';
export const UNLOCK = 'UNLOCK';
export const EXECUTE = 'EXECUTE';
export const UPDATE_OUTPUT = 'UPDATE_OUTPUT'

// Action interfaces

interface LockAction {
    type: typeof LOCK
}

interface UnlockAction {
    type: typeof UNLOCK
}

interface ExecuteAction {
    type: typeof EXECUTE,
    code: string
}

interface UpdateOutputAction {
    type: typeof UPDATE_OUTPUT,
    output: string
}

export type Action = LockAction
    | UnlockAction
    | ExecuteAction
    | UpdateOutputAction

// Action creators

export function lock(): Action {
    return { type: LOCK };
}

export function unlock(): Action {
    return { type: UNLOCK };
}

export function updateOutput(output: string): Action {
    return {
        type: UPDATE_OUTPUT,
        output
    };
}

export const execute = (code: string) => (dispatch: Dispatch) => {

    dispatch({ type: EXECUTE });
    dispatch(lock());

    fetch('/execute', {
        method: 'POST',
        body: code
    })
    .then((response) => {

        let text = '';
        const reader = response.body.getReader()
        const decoder = new TextDecoder();

        const readChunk = (): {} => reader.read().then(appendChunks);

        const appendChunks = (result: ReadableStreamReadResult<Uint8Array>): {} => {
            var chunk = decoder.decode(result.value || new Uint8Array(0), { stream: !result.done });
            text += chunk;

            dispatch(updateOutput(Strip(text)));

            if (result.done) {
                dispatch(unlock());
            } else {
                return readChunk();
            }
        }

        return readChunk();
    })
    .catch((err) => {

        dispatch(unlock());
        alert('An error occured, please try again...');
        console.log(err);
    });
};
