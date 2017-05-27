export default function (state = null, action) {
    switch (action.type) {
        case 'FETCH_ONLINE_STATUS':
            return  action.payload;
            break;
    }
    return state;
}