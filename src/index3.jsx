import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import allReducers from './reducers';
import FriendIndex from './components/friend/FriendIndex.jsx';

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
ReactDOM.render(
    <Provider store={store}>
        <FriendIndex />
    </Provider>
    ,
    document.getElementById('friendList')
);
