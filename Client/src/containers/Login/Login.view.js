import React, {Component} from 'react';
import {subscribe_events, join_room, create_new_room, update_selected_room, update_user_name} from './Login.actions';
import {connect} from 'react-redux';
import {Form, Button} from'react-bootstrap';
import { withRouter } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props)
        props.subscribeEvents(props.socket);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {roomJoined, roomCreated, history} = this.props;
        if(roomJoined || roomCreated) {
            history.push('/players');
        }
    }

    handleCreateRoom = () => {
        const {createRoom, socket, user} = this.props;
        if(user) {
            createRoom(socket, user);
        }
    }

    handleJoinRoom = () => {
        const {joinRoom, socket, selectedRoom, user} = this.props;
        if(selectedRoom && user) {
            joinRoom(socket, selectedRoom, user);
        }
    }

    render() {
        const {user, rooms, selectedRoom, updateSelectedRoom, updateUserName} = this.props;

        const availableRooms = Object.keys(rooms).map((room, index) => (<option key={room} value={room}>{room}</option>));

        return (
            <div className="">
                <Form>
                    <Form.Label className="App-header">Wheel of Fortune</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label className="">User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={user} onChange={updateUserName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="">Available Rooms</Form.Label>
                        <Form.Control as="select" defaultValue={selectedRoom || ""} onChange={updateSelectedRoom}>
                            {availableRooms}
                        </Form.Control>
                    </Form.Group>
                    <div className="row">
                        <Button className="col-sm-5 login-button" variant="primary" onClick={this.handleCreateRoom}>Start new game</Button>
                        <Button className="col-sm-5 login-button" variant="primary" onClick={this.handleJoinRoom}>Join</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        subscribeEvents: (socket) => dispatch(subscribe_events(socket)),
        joinRoom: (socket, selectedRoom, user) => dispatch(join_room(socket, selectedRoom, user)),
        createRoom: (socket, user) => dispatch(create_new_room(socket, user)),
        updateSelectedRoom: (e) => dispatch(update_selected_room(e)),
        updateUserName: (e) => dispatch(update_user_name(e))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
