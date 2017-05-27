import React, {Component} from 'react'

class StatusIndex extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.statuses === null)
            return (
                <div></div>
            );
        return (
            <div>
                {this.props.statuses.map((status, index) => {
                    console.log(status);
                    return (
                        <div key={index}>
                            <a
                                 className="list-group-item list-group-item-info chat-status"
                                 onClick={(e) => {
                                     var data = {
                                         id: status.inMessageRoomId,
                                         socket: this.props.socket,
                                         props: this.props.chatProps,
                                         friend: status.from.id
                                     };
                                     this.props.chatProps.actions.fetchChatRoom(data);
                                 }}
                            >
                                {status.number} new message(s) from {status.from.name}
                            </a>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default StatusIndex;