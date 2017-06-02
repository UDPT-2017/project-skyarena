export default function (state = null, action) {
    switch (action.type) {
        case 'GET_FRIEND':
            return action.payload;
            break;
        case 'WAITING_FRIEND':
            return {
                waiting: true
            };
            break;
        default:
            return state
    }
}
