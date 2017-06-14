export default function (state = null, action) {
    switch (action.type) {
        case 'GET_FRIEND':
            return action.payload;
        case 'WAITING_FRIEND':
            return {
                waiting: true
            };
        default:
            return state
    }
}
