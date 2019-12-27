import { Dispatch } from 'redux';
import Strip from 'strip-ansi'

import { ApplicationState } from './state'

// Action types

export const LOCK = 'LOCK';
export const UNLOCK = 'UNLOCK';
export const EXECUTE = 'EXECUTE';
export const UPDATE_OUTPUT = 'UPDATE_OUTPUT'
export const UPDATE_EXAMPLES = 'UPDATE_EXAMPLES'
export const SELECT_EXAMPLE = 'SELECT_EXAMPLE'
export const UPDATE_CODE = 'UPDATE_CODE'
export const CLEAR_OUTPUT = 'CLEAR_OUTPUT'
export const UPDATE_VERSIONS = 'UPDATE_VERSIONS'
export const SELECT_VERSION = 'SELECT_VERSION'
export const TOGGLE_PERMISSION = 'TOGGLE_PERMISSION'

// Action interfaces

export interface Example {
    name: string;
    file: string;
    body: string;
}

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

interface UpdateCodeAction {
    type: typeof UPDATE_CODE,
    code: string
}

interface UpdateOutputAction {
    type: typeof UPDATE_OUTPUT,
    output: string
}

interface UpdateExamplesAction {
    type: typeof UPDATE_EXAMPLES,
    examples: Array<Example>
}

interface SelectExampleAction {
    type: typeof SELECT_EXAMPLE,
    selected: number
}

interface ClearOutputAction {
    type: typeof CLEAR_OUTPUT
}

interface UpdateVersionAction {
    type: typeof UPDATE_VERSIONS
    versions: Array<string>
}

interface SelectVersionAction {
    type: typeof SELECT_VERSION
    version: number
}

interface TogglePermissionAction {
    type: typeof TOGGLE_PERMISSION
    permission: string
}

export type Action = LockAction
    | UnlockAction
    | ExecuteAction
    | UpdateOutputAction
    | UpdateExamplesAction
    | SelectExampleAction
    | UpdateCodeAction
    | ClearOutputAction
    | UpdateVersionAction
    | SelectVersionAction
    | TogglePermissionAction

// Action creators

export function lock(): Action {
    return { type: LOCK };
}

export function clearOuput(): Action {
    return { type: CLEAR_OUTPUT };
}

export function updateCode(code: string): Action {
    return { type: UPDATE_CODE, code };
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

export function updateExamples(examples: Array<Example>): Action {
    return {
        type: UPDATE_EXAMPLES,
        examples
    };
}

export const selectExample = (input: any) => (dispatch: Dispatch, getState: () => ApplicationState) => {

    const state = getState();
    const selected = parseInt(input.target.value);

    dispatch({ type: SELECT_EXAMPLE, selected });
    if (selected != -1) {
        dispatch({ type: UPDATE_CODE, code: state.examples[selected].body });
    }
}

export const selectVersion = (input: any) => (dispatch: Dispatch, getState: () => ApplicationState) => {

    const version = parseInt(input.target.value);
    console.log(version);
    dispatch({ type: SELECT_VERSION, version });
}

export function updateVersions(versions: Array<string>): Action {
    return {
        type: UPDATE_VERSIONS,
        versions
    };
}

export function togglePermission(permission: string) {
    return {
        type: TOGGLE_PERMISSION,
        permission
    };
}

export const execute = (code: string) => (dispatch: Dispatch, getState: () => any) => {

    dispatch({ type: EXECUTE });
    dispatch(lock());
    dispatch(clearOuput());

    const state = getState();

    fetch(`/execute?version=${state.versions[state.version]}`, {
        method: 'POST',
        body: JSON.stringify({
            code,
            permissions: getState().permissions
        })
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
