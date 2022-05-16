import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './containers/Login/Login.view';
import Board from './containers/Board/Board.view';
import PlayerList from './containers/PlayerList/PlayerList.view';
import * as io from 'socket.io-client';
import {Switch, Route} from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props)
        this.socket = io.connect('localhost:4000');
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/' component={() => <Login socket={this.socket} />}></Route>
                    <Route exact path='/board' component={() => <Board socket={this.socket} />}></Route>
                    <Route exact path='/players' component={() => <PlayerList socket={this.socket} />}></Route>
                </Switch>
            </div>
        );
    }
}


export default App;
