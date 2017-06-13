import {combineReducers} from 'redux';
import ArtistReducer from './reducer-artist';
import ChatReducer from './reducer-chat';
import StatusReducer from './reducer-status';
import VideoReducer from './reducer-video';
import FriendReducer from './reducer-friend';
import YourVideo from './reducer-your-video'
import OnlineStatusReducer from './reducer-online-status';
import CurrentVideo from './reducer-current-video';

const allReducers = combineReducers({
    artist: ArtistReducer,
    chat: ChatReducer,
    status: StatusReducer,
    online: OnlineStatusReducer,
    video: VideoReducer,
    friendList: FriendReducer,
    your: YourVideo,
    current: CurrentVideo
});

export default allReducers
