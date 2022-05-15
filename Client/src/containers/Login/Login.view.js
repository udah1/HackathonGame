import * as io from 'socket.io-client';
import React, {Component} from 'react';
import {subscribe_events, join_room, create_new_room} from './Login.actions'
import {connect} from 'react-redux'
import {Form, Button} from'react-bootstrap'

class Login extends Component {

    constructor(props) {
        super(props)
        this.socket = io.connect('localhost:4000', { wsEngine: 'uws' });
        this.state = {
            userName: ""
        }
    }

    render() {
        const {joinRoom, createRoom} = this.props;

        return (
            <div className="">
                <Form>
                    <Form.Label className="App-header">Wheel of Fortune</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label className="">User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={this.state.userName} />
                    </Form.Group>
                    <Button variant="primary" onClick={createRoom}>Start new game</Button>
                    <Button variant="primary" onClick={joinRoom}>Join</Button>
                </Form>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        subscribeEvents: (socket) => dispatch(subscribe_events(socket)),
        joinRoom: (socket, id) => dispatch(join_room(socket, id)),
        createRoom: (socket) => dispatch(create_new_room(socket, this.state.userName))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.main
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
