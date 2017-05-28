export default function (state = [], action) {
    switch (action.type) {
        case 'FETCH_ARTIST':
            return  action.payload.data.artists.items;
            break;
    }
    return state;
}
