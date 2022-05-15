import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Form, Button, Table} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import {room_joined} from '../Login/Login.actions';


class PlayerList extends Component {

    constructor(props) {
        super(props);
        props.subscribeEvents(props.socket);
    }

  renderScoreBoard = () => {
        const {gamePlayers} = this.props;
        const players = Object.keys(gamePlayers || []);

        return players.map( (item, index) => {
            const player = gamePlayers[item];
            return (
              <tr key={player.user}>
                <td>{index + 1}</td>
                <td>{player.user}</td>
                <td>{player.points}</td>
              </tr>
            );
        });
    };

    handleStartGame = () => {
        const {createRoom, socket, user} = this.props;
        if(user) {
            createRoom(socket, user);
        }
    }

    render() {
        const {gameOwner} = this.props;
        return (
            <div>
                <Form.Label className="App-header">Wheel of Fortune</Form.Label>
                <Table striped bordered hover size="sm" className="scoreBoard">
                    <thead>
                        <tr>
                            <th style={{width: '25px'}}>#</th>
                            <th style={{width: '200px'}}>Player name</th>
                            <th style={{width: '250px'}}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderScoreBoard()}
                    </tbody>
                </Table>
                {gameOwner && <div className="row">
                    <Button className="col-sm-5 login-button" variant="primary" onClick={this.handleStartGame}>Start game</Button>
                </div>}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        subscribeEvents: (socket) => dispatch(room_joined(socket))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerList))
