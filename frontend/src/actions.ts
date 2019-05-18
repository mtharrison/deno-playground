import { Dispatch } from 'redux';
import Strip from 'strip-ansi'

import { ApplicationState, Action, ActionType } from './types'

export function lock() {
    return {
        type: ActionType.Lock
    };
}

export function unlock() {
    return {
        type: ActionType.Unlock
    };
}

export function updatedOutput(output: string) {
    return {
        type: ActionType.UpdatedOutput,
        output
    };
}

export const execute = (code: string) => (dispatch: Dispatch) => {

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

            dispatch(updatedOutput(Strip(text)));

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
