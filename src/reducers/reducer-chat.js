
export default function (state = null, action) {
    switch (action.type) {
        case 'FETCH_CHAT_ROOM':

            return action.payload.data;

            break;
        case 'NEW_MESSAGE':
            var newstate = Object.assign({}, state);
            newstate.messages.push({
                createdAt: action.payload.createdAt,
                text: action.payload.text,
                user: {
                    name: action.payload.name,
                    avatar: action.payload.avatar
                }
            });
            return newstate;
            break;
        default:
            return state
    }
}
