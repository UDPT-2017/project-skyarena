import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import allReducers from './reducers';
import ChatIndex from './components/ChatIndex.jsx';
import axios from 'axios';

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
$(function () {
    axios.get(process.env.URL + '/message/get').then(function (res) {
        ReactDOM.render(
            <Provider store={store}>
                <ChatIndex user={res.data}/>
            </Provider>
            ,
            document.getElementById('message-page')
        );
    });

});