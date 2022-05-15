import React, {Component} from 'react';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './containers/Login/Login.view';
import Board from './containers/Board/Board.view';
import Score from './containers/Score/Score.view';
import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux'
import thunk from "redux-thunk";

const store = createStore(rootReducer, {reducer: {}}, applyMiddleware(thunk));

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login/>
                    <Board/>
                    <Score />
                </div>
            </Provider>
        );
    }
}


export default App;
