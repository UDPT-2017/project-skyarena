import axios from 'axios';

export const queryArtist = (payload) => {
    const url = process.env.SPOTIFY_BASE_URL + '?q=' + payload + '&type=artist&limit=1';

    return function (dispatch) {
        axios
            .get(url,
                {
                    'headers': {
                        'Authorization': process.env.SPOTIFY_AUTHORIZATION
                    }
                })
            .then(function (response) {
                    dispatch({
                        type: 'FETCH_ARTIST',
                        payload: response
                    });
                    return axios.get(
                        `https://api.spotify.com/v1/artists/${response.data.artists.items[0].id}/top-tracks?country=US&`,
                        {'headers': {'Authorization': process.env.SPOTIFY_AUTHORIZATION}})
                }
            )
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: 'FETCH_SONG',
                    payload: response
                })
            })

    };
};
export const fetchChatRoom = (payload) => {
    const url = '/message/' + payload.id.toString();
    return function (dispatch) {
        axios
            .get(url)
            .then(function (response) {
                dispatch({
                    type: 'FETCH_CHAT_ROOM',
                    payload: response
                });
                console.log(payload);
                payload.socket.emit("LOAD_CHAT_ROOM", {
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
export const fetchOnlineStatus = () => {
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
export const closeChatPopUp = () => {
    return function (dispatch) {
        dispatch({
            type: "CLOSE_CHAT_POP_UP",
            payload: null
        })
    }
};
export const removeFriend = (id, page, query)=>{
    return function (dispatch) {
        dispatch({
            type: "WAITING_FRIEND"
        });
        axios.get('/friend/remove?id=' + id.toString()).then(function (res) {
            axios.get('/friend/get?page=' + page.toString()).then((response) => {
                axios.get('/friend/count').then((response2) => {
                    dispatch({
                        type: "GET_FRIEND",
                        payload: {
                            friends: response.data,
                            count: parseInt(response2.data.count),
                            page,
                            query,
                            waiting: false
                        }
                    })

                })

            })
        })
    }

};
export const addFriend = (id, page, query)=>{
    return function (dispatch) {
        dispatch({
            type: "WAITING_FRIEND"
        });
        axios.get('/friend/add?id=' + id.toString()).then(function (res) {
            axios.get('/friend/get?page=' + page.toString()).then((response) => {
                axios.get('/friend/count').then((response2) => {
                    dispatch({
                        type: "GET_FRIEND",
                        payload: {
                            friends: response.data,
                            count: parseInt(response2.data.count),
                            page,
                            query,
                            waiting: false
                        }
                    })

                })

            })
        })
    }

};
export const acceptFriend = (id, page, query)=>{
    return function (dispatch) {
        dispatch({
            type: "WAITING_FRIEND"
        });
        axios.get('/friend/accept?id=' + id.toString()).then(function (res) {
            axios.get('/friend/get?page=' + page.toString()).then((response) => {
                axios.get('/friend/count').then((response2) => {
                    dispatch({
                        type: "GET_FRIEND",
                        payload: {
                            friends: response.data,
                            count: parseInt(response2.data.count),
                            page,
                            query,
                            waiting: false
                        }
                    })

                })

            })
        })
    }

};

export const fetchFriend = (page, query) => {
    return function (dispatch) {
        dispatch({
            type: "WAITING_FRIEND"
        });
        axios.get('/friend/get?page=' + page.toString() + "&query=" + query).then((response) => {
            axios.get('/friend/count?query=' + query).then((response2) => {
                dispatch({
                    type: "GET_FRIEND",
                    payload: {
                        friends: response.data,
                        count: parseInt(response2.data.count),
                        page,
                        query,
                        waiting: false
                    }
                })

            })

        })
    }
};
