import axios from 'axios';

export const queryArtist = (payload) => {
    const url = process.env.SPOTIFY_BASE_URL + '?q=' + payload + '&type=artist&limit=1';

    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_ARTIST',
                    payload: response
                });
                return axios.get(`https://api.spotify.com/v1/artists/${response.data.artists.items[0].id}/top-tracks?country=US&`)
            })
            .then(function (response) {
                dispatch({
                    type: 'FETCH_SONG',
                    payload: response
                })
            })

    };
};
export const fetchChatRoom = (payload) => {
    const url =  '/message/' + payload.id.toString();
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_CHAT_ROOM',
                    payload: response
                });
                console.log(payload);
                payload.socket.emit("LOAD_CHAT_ROOM",{
                    user: payload.user,
                    friend: payload.friend,
                    room: payload.id.toString()
                });
            });

    };
};
export const newMessage = (payload) => {
    return {
        type: 'NEW_MESSAGE',
        payload: payload,
    }
};
export const fetchStatus = () => {
    const url = '/message/status';
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_STATUS',
                    payload: response.data
                })
            });

    };
};
export const fetchOnlineStatus = ()=>{
    const url = '/message/get';
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_ONLINE_STATUS',
                    payload: response.data
                })
            });

    };
};
export const closeChatPopUp = ()=>{
    return function (dispatch) {
        dispatch({
            type: "CLOSE_CHAT_POP_UP",
            payload: null
        })
    }
};
