import * as io from 'socket.io-client';
import React, {Component} from 'react';
// import Board from '../Board/Board.view'
// import Rooms from '../Rooms/Rooms.view'
import {subscribe_events, join_room, create_new_room} from './Login.actions'
import {connect} from 'react-redux'
import {Form, Button} from'react-bootstrap'

class Login extends Component {

    constructor(props) {
        super(props)
        // this.socket = io('localhost:4000', { wsEngine: 'uws' });
        //props.subscribeEvents(this.socket);
    }

    render() {
        const {roomNumber, joinRoom, createRoom, show, myTurn, sign} = this.props;

        return (
            <div>
                <Form>
                    <Form.Label>Wheel of Fortune</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" />
                    </Form.Group>
                    <Button variant="primary" onClick={null}>Start new game</Button>
                    <Button variant="primary" onClick={null}>Join</Button>
                </Form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        subscribeEvents: (socket) => dispatch(subscribe_events(socket)),
        joinRoom: (socket, id) => dispatch(join_room(socket, id)),
        createRoom: (socket) => dispatch(create_new_room(socket))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.main
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
