export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_SONG':
            return  action.payload.data.tracks;
            break;
    }
    return state;
}