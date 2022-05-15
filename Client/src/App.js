import React, {Component} from 'react';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './containers/Login/Login.view';
import Board from './containers/Board/Board.view';
import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux';
import * as io from 'socket.io-client';
import thunk from "redux-thunk";
import {
    Routes,
    Route
} from 'react-router-dom';

const store = createStore(rootReducer, {reducer: {}}, applyMiddleware(thunk));

class App extends Component {

    constructor(props) {
        super(props)
        this.socket = io.connect('localhost:4000', { wsEngine: 'uws' });
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Routes>
                        <Route exact path='/' element={<Login socket={this.socket} />}></Route>
                        <Route exact path='/board' element={<Board socket={this.socket} />}></Route>
                    </Routes>
                </div>
            </Provider>
        );
    }
}


export default App;
