import {combineReducers} from 'redux';
import MusicReducer from './reducer-music';
import ChatReducer from './reducer-chat';
import StatusReducer from './reducer-status';
import OnlineStatusReducer from './reducer-online-status';

const allReducers = combineReducers({
    artist: MusicReducer,
    chat: ChatReducer,
    status: StatusReducer,
    online: OnlineStatusReducer
});

export default allReducers
