
export default function (state = null, action) {
    switch (action.type) {
        case 'FETCH_CHAT_ROOM':

            return action.payload.data;

        case 'NEW_MESSAGE':
            var newstate = Object.assign({}, state);
            newstate.messages.push({
                createdAt: action.payload.createdAt,
                text: action.payload.text,
                user: {
                    name: action.payload.name,
                    avatar: action.payload.avatar,
                    id: action.payload.fromUserId
                }
            });
            return newstate;
        case 'CLOSE_CHAT_POP_UP':
            return null;
        default:
            return state
    }
}
