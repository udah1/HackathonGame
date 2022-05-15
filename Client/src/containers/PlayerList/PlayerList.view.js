import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Form, Button, Table} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import {room_joined, start_game, get_categories} from './PlayerList.actions';


class PlayerList extends Component {

    constructor(props) {
        super(props);
        props.subscribeEvents(props.socket);
        props.getCategories();
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
        const {selectedRoom, socket, startGame, categories, history} = this.props;
        startGame(socket, selectedRoom, categories[0]);
        history.push('/board');
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
        subscribeEvents: (socket) => dispatch(room_joined(socket)),
        getCategories: () => dispatch(get_categories()),
        startGame: (socket, selectedRoom, category) => dispatch(start_game(socket, selectedRoom, category))
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login,
        ...state.reducer.playerList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerList))
