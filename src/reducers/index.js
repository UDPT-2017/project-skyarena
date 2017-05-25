import {combineReducers} from 'redux';
import MusicReducer from './reducer-music';
import ChatReducer from './reducer-chat';
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    artist: MusicReducer,
    chat: ChatReducer
});

export default allReducers
