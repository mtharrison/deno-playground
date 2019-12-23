import * as React from 'react';
import { connect } from 'react-redux'

import { ApplicationState } from '../state'
import { togglePermission } from '../actions'

interface PermissionsProps {
    togglePermission: (permission: string) => any,
    permissions: any
}

const Permissions = (props: PermissionsProps) => {

    return (
        <ul>
            <li><label htmlFor="allow-net">--allow-net</label><input onChange={() => props.togglePermission('net')} checked={props.permissions.net} type="checkbox" name="allow-net" id="allow-net"/></li>
            <li><label htmlFor="allow-read">--allow-read</label><input onChange={() => props.togglePermission('read')} checked={props.permissions.read} type="checkbox" name="allow-read" id="allow-read"/></li>
            <li><label htmlFor="allow-write">--allow-write</label><input onChange={() => props.togglePermission('write')} checked={props.permissions.write} type="checkbox" name="allow-write" id="allow-write"/></li>
            <li><label htmlFor="allow-run">--allow-run</label><input onChange={() => props.togglePermission('run')} checked={props.permissions.run} type="checkbox" name="allow-run" id="allow-run"/></li>
            <li><label htmlFor="allow-env">--allow-env</label><input onChange={() => props.togglePermission('env')} checked={props.permissions.env} type="checkbox" name="allow-env" id="allow-env"/></li>
        </ul>
    );
}

const mapStateToProps = (state: ApplicationState) => ({ permissions: state.permissions });
const mapDispatchToProps = { togglePermission };

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)
