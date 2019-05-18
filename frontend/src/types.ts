export interface ApplicationState {
    output: string,
    code: string,
    name: string,
    locked: boolean
}

export enum ActionType {
    UpdatedOutput,
    Execute,
    Lock,
    Unlock
}

export interface ExecuteAction {
    type: ActionType,
    code: string
}

export interface UpdatedOutputAction {
    type: ActionType,
    output: string
}

export interface LockAction {
    type: ActionType
}

export interface UnlockAction {
    type: ActionType
}

export type Action = ExecuteAction
    | UpdatedOutputAction
    | LockAction
    | UnlockAction
