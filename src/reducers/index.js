import {combineReducers} from 'redux';
import MusicReducer from './reducer-music';
import ChatReducer from './reducer-chat';
import StatusReducer from './reducer-status';

const allReducers = combineReducers({
    artist: MusicReducer,
    chat: ChatReducer,
    status: StatusReducer
});

export default allReducers
