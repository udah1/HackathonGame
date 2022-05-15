import React, {Component} from 'react';
import {connect}    from 'react-redux';
import {Form, Button, Table} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import {room_joined, start_game, get_categories, update_selected_category, resetGame} from './PlayerList.actions';


class PlayerList extends Component {

    constructor(props) {
        super(props);
        props.subscribeEvents(props.socket);
        props.getCategories();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {gameStarted, gameOwner, history} = this.props;
        if(gameStarted && !gameOwner) {
            history.push('/board');
        }
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
        const {selectedRoom, roomNumber, socket, startGame, categories, history, gameOwner, selectedCategory, resetGame} = this.props;
        resetGame();
        const room = gameOwner ? roomNumber : selectedRoom;
        startGame(socket, room, selectedCategory || categories[0]);
        history.push('/board');
    }

    render() {
        const {gameOwner, categories=[], selectedCategory, updateSelectedCategory} = this.props;
        const availableCategories = categories.map((category, index) => (<option key={category} value={category}>{category}</option>));
        return (
            <div className="container">
                <Form.Label className="App-header">גלגל המזל</Form.Label>
                <Table striped bordered size="sm" className="scoreBoard">
                    <thead>
                        <tr>
                            <th style={{width: '25px'}}>#</th>
                            <th style={{width: '200px'}}>שחקן</th>
                            <th style={{width: '250px'}}>ניקוד</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderScoreBoard()}
                    </tbody>
                </Table>
                {gameOwner && <Form.Group className="mb-3">
                    <Form.Label className="">קטגוריה</Form.Label>
                    <Form.Control size="lg" as="select" defaultValue={selectedCategory || ""} onChange={updateSelectedCategory}>
                        {availableCategories}
                    </Form.Control>
                </Form.Group>}
                {gameOwner && <div className="row" style={{width: '100%', margin: 'auto 25%'}}>
                    <Button className="col-sm-5 login-button" variant="primary" onClick={this.handleStartGame}>התחל</Button>
                </div>}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        subscribeEvents: (socket) => dispatch(room_joined(socket)),
        getCategories: () => dispatch(get_categories()),
        updateSelectedCategory: (e) => dispatch(update_selected_category(e)),
        resetGame: () => dispatch(resetGame()),
        startGame: (socket, selectedRoom, category) => start_game(socket, selectedRoom, category)
    }
}

function mapStateToProps(state) {
    return {
        ...state.reducer.login,
        ...state.reducer.playerList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerList))
