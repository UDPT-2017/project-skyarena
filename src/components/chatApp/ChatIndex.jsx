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
            if (this.props.state.chat.id === data.id) {
                console.log(data);
                this.props.actions.newMessage(data)
            }else{
                this.props.actions.fetchStatus();
            }
        });
        socket.on('STATUS_CHANGE', () => {
            this.props.actions.fetchStatus();
        });
        socket.on('CREATED_MESSAGE_STATUS',()=>{
            socket.emit("LOAD_CHAT_ROOM",{
                user: this.props.state.user.id,
                friend: this.props.state.friend.id,
                room: this.props.state.friend.messageRoomId.toString()
            });
        })

    }
    componentDidMount() {
        this.props.actions.fetchStatus();

        this.props.user.friends.map(function (friend) {
            socket.emit("join", {
                id: friend.messageRoomId.toString()
            });
        })
    }

    render() {
        return (
            <div>
                <div className="col-xs-4 chat-index ">
                    {
                        this.props.user.friends.map((friend) => {
                            if (friend.check) {

                                var link = "room-" + friend.messageRoomId.toString();
                                return (
                                    <div key={link}>
                                        <button className="btn btn-info col-xs-12"  onClick={(e) => {
                                            var data ={id: friend.messageRoomId, socket: socket, props: this.props, friend: friend};
                                            this.props.actions.fetchChatRoom(data);
                                        }}>
                                            Chat with {friend.to.name}
                                        </button>
                                    </div>
                                )
                            }
                        })
                    }

                </div>
                <div className="col-xs-8">
                    <StatusIndex statuses = {this.props.state.status}/>
                </div>
                <div>
                    <ChatPopUp data={this.props.state.chat} socket={socket}/>
                </div>
            </div>

        )
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
