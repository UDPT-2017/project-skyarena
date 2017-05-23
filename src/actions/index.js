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
                })
            });

    };
};
