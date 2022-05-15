import React, {Component} from 'react';
import {subscribe_events, join_room, create_new_room, update_selected_room, update_user_name} from './Login.actions';
import {connect} from 'react-redux';
import {Form, Button} from'react-bootstrap';
import { useHistory } from "react-router";

class Login extends Component {

    constructor(props) {
        super(props)
        props.subscribeEvents(props.socket);
    }

    handleCreateRoom = () => {
        const {createRoom, socket, selectedRoom, userName} = this.props;
        createRoom(socket, selectedRoom, userName);
    }

    handleJoinRoom = () => {
        const {joinRoom, socket, selectedRoom, userName} = this.props;
        joinRoom(socket, selectedRoom, userName);
    }

    render() {
        const {userName, rooms, selectedRoom, updateSelectedRoom, updateUserName} = this.props;
        const availableRooms = rooms.map((room, roomKey) => (<option key={roomKey} value={roomKey}>{roomKey}</option>));

        return (
            <div className="">
                <Form>
                    <Form.Label className="App-header">Wheel of Fortune</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label className="">User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" defaultValue={userName} onChange={updateUserName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="">Available Rooms</Form.Label>
                        <Form.Control as="select" defaultValue={selectedRoom} onChange={updateSelectedRoom}>
                            {availableRooms}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleCreateRoom}>Start new game</Button>
                    <Button variant="primary" onClick={this.handleJoinRoom}>Join</Button>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        subscribeEvents: (socket) => dispatch(subscribe_events(socket)),
        joinRoom: (socket, selectedRoom, userName) => dispatch(join_room(socket, selectedRoom, userName)),
        createRoom: (socket, selectedRoom, userName) => dispatch(create_new_room(socket, selectedRoom, userName)),
        updateSelectedRoom: (e) => dispatch(update_selected_room(e)),
        updateUserName: (e) => dispatch(update_user_name(e))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
