
export default function (state = null, action) {
    switch (action.type) {
        case 'GET_FRIEND':
            return action.payload;
            break;
        default:
            return state
    }
}
