export default function (state = null, action) {
    switch (action.type) {
        case 'FETCH_STATUS':
            return  action.payload;
            break;
    }
    return state;
}
