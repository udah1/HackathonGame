import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {createBrowserHistory} from 'history'
import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";

const store = createStore(rootReducer, {reducer: {}}, applyMiddleware(thunk));
const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
