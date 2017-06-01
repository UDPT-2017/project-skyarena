import {combineReducers} from 'redux';
import ArtistReducer from './reducer-artist';
import ChatReducer from './reducer-chat';
import StatusReducer from './reducer-status';
import SongReducer from './reducer-song';
import FriendReducer from './reducer-friend';

import OnlineStatusReducer from './reducer-online-status';

const allReducers = combineReducers({
    artist: ArtistReducer,
    chat: ChatReducer,
    status: StatusReducer,
    online: OnlineStatusReducer,
    song: SongReducer,
    friendList: FriendReducer
});

export default allReducers
