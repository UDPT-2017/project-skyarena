import React, {Component} from 'react'
import ChatPopUp from './ChatPopUp.jsx'
import StatusIndex from './StatusIndex.jsx'
import * as actions from '../../actions/index'
import  {bindActionCreators} from 'redux'
import {connect}  from 'react-redux'
import io from 'socket.io-client'


var socket = io();

class ChatIndex extends Component {
    constructor(props) {
        super(props);
        socket.on('CREATED_MESSAGE', (data) => {
            if (this.props.state.chat && this.props.state.chat.id === data.id) {
                this.props.actions.newMessage(data)
            } else {
                this.props.actions.fetchStatus();
            }
        });

        socket.on('STATUS_CHANGE', () => {
            this.props.actions.fetchStatus();
        });
        socket.on('CREATED_MESSAGE_STATUS', () => {
            if (this.props.state.chat) {
                socket.emit("LOAD_CHAT_ROOM", {
                    user: this.props.state.chat.session.id,
                    friend: this.props.state.chat.friend.id,
                    room: this.props.state.chat.id.toString()
                });
            }
        });
        socket.on('UPDATE_USER_ONLINE', () => {
            this.props.actions.fetchOnlineStatus();
        });
        socket.emit("ONLINE", {
            userId: this.props.user.id
        });
        socket.username = this.props.user.id;
        this.props.user.friends.map((friend) => {
            if (friend.check) {
                socket.emit("JOIN", {
                    id: friend.messageRoomId.toString()
                });
            }
        });
    }

    componentDidMount() {

        this.props.actions.fetchStatus();
        this.props.actions.fetchOnlineStatus();
    }

    componentWillUnmount() {
        var rooms = [];
        this.props.state.online.friends.map((friend) => {
            rooms.push(friend.messageRoomId.toString());
        });
        socket.emit("OFFLINE", {
            userId: this.props.state.online.id,
            rooms: rooms
        });
    }

    render() {
        if (!this.props.state.online) {
            return (
                <div></div>
            )
        } else {
            return (
                <div>
                    <div className="col-xs-4 chat-index ">
                        {
                            this.props.state.online.friends.map((friend) => {
                                if (friend.check) {
                                    var link = "room-" + friend.messageRoomId.toString();
                                    return (
                                        <div key={link}>
                                            <div className="btn btn-info col-xs-12" onClick={(e) => {
                                                var data = {
                                                    id: friend.messageRoomId,
                                                    socket: socket,
                                                    user: this.props.state.online.id,
                                                    friend: friend.toUserId
                                                };
                                                this.props.actions.fetchChatRoom(data);
                                            }}>

                                                {
                                                    friend.to.check ?
                                                        <div>
                                                            Chat with {friend.to.name} <img alt="Embedded Image"
                                                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4T7WTvUsCcRjHv57h3ZloGiRJgUH5QkGDIbRagk1Baw0tDdIWIv0JIdIWDS0Ntboq+AcEkUOBYAZ1QacpvuTLeZ0ev4sarLMURPrBs/2ez/PhedFgxKcZMR//ALiwGKEb24ai+AFMA8hDo0miLV9ip1LvNVYbfCZTVNQ14/A7bU6rXsfSgtSSMrn7QpZ/SIKQUC9EDTifDDpmF8Jum8suimK3GE3TSL+kucc8F8Fu+fSnhRpwZomteXwBoS6whBBIkvQViqKAGWfE2+e7BPYqW/0BJ6Yrn3fdy7/yVLVRRUfudP8yNEPyJf4a+7XV/oBjU2xxeSmQE/Lsr/HKEKtcOYGD2gCDI0PQaDOHmXm9vaN8V4cCtLINTiqKERw2B/RgA0Z49FF2jvXr3AYrZdDSpCFL7xmhID2JSaRaIcShGmXvIulghgteahM2agUUpkBQRI7cIEXiKCEDoNm/B4AWwAQA+o8VlwG8AWgPAgx9Gv9wC0M6fABigowRmhtEUwAAAABJRU5ErkJggg=="/>
                                                        </div>
                                                        :
                                                        <div>
                                                            Chat with {friend.to.name} <img alt="Embedded Image"
                                                                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T7WTMUtCYRSGn3sDr14sbEmKCLGGIFCoCMJZMByC1hpaGqItRPoJEdEWDS0NtbYW+AOCSFBcNKgriUUmGZrmp/LdqKHykkFYB77xPN973vMehS5L6bKfvwccQp8NFk0IAoPAnQKxBhwtQdmquE3BW7MK216fL+j1+92a06nVKxVxnUzeG6lUTELECmkDHMDq2MREdMTv91Sr1Y/P7HY7RiKRvclktpZh76uKNsA+HAfC4VCxVHJIKRFCvD/TNOnV9ZerePx0BRY6AnbhLBAKzeQMQ62USrSazU8Vui4f8vnzNZjtCNiB40mfL1TO5RxWs1qK8pJ9fDxd/0nBJqwOu1zRUU3zyEbjg2ECl7VatiDE1sZPHsxB39TbFhyO4LjN5naqqlaRUqTr9XtDiFgcIieWVVqDZOuH8RmYH4JpFQYkFG7hIg4nRUgDzx09AHoAF6B9E/EW8AR8zgb/EOXfHlfXx/QKQrt/EaXk3vAAAAAASUVORK5CYII="/>
                                                        </div>

                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }

                    </div>
                    <div className="col-xs-8">
                        <StatusIndex statuses={this.props.state.status} chatProps={this.props} socket={socket}/>
                    </div>
                    <div>
                        <ChatPopUp data={this.props.state.chat} socket={socket} chatProps={this.props}/>
                    </div>
                </div>

            )
        }
    }
}
function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatIndex);
