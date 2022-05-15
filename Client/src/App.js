import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './containers/Login/Login.view';
import Board from './containers/Board/Board.view';
import Score from './containers/Score/Score.view';
import * as io from 'socket.io-client';
import {Switch, Route} from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props)
        this.socket = io.connect('192.168.41.199:4000');
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path='/' component={() => <Login socket={this.socket} />}></Route>
                    <Route exact path='/board' component={() => <Board socket={this.socket} />}></Route>
                    <Route exact path='/score' component={() => <Score socket={this.socket} />}></Route>
                </Switch>
            </div>
        );
    }
}


export default App;
