import * as io from 'socket.io-client';
import React, {Component} from 'react';
import {subscribe_events, join_room, create_new_room, get_rooms, update_selected_room} from './Login.actions'
import {connect} from 'react-redux'
import {Form, Button} from'react-bootstrap'

class Login extends Component {

    constructor(props) {
        super(props)
        // this.socket = io.connect('localhost:4000', { wsEngine: 'uws' });

        //props.subscribeEvents(this.socket);
        //this.props.getRooms(this.socket);
    }

    render() {
        const {joinRoom, createRoom, userName, availableRooms, selectedRoom, updateSelectedRoom} = this.props;
        const rooms = availableRooms.map((room) => (<option key={room} value={room}>{room}</option>));

        return (
            <div className="">
                <Form>
                    <Form.Label className="App-header">Wheel of Fortune</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label className="">User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={userName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="">Available Rooms</Form.Label>
                        <Form.Control as="select" defaultValue={selectedRoom} onChange={updateSelectedRoom}>
                            {rooms}
                        </Form.Control>
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
        createRoom: (socket, userName) => dispatch(create_new_room(socket, userName)),
        getRooms: (socket) => dispatch(get_rooms(socket)),
        updateSelectedRoom: (e) => dispatch(update_selected_room(e))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
