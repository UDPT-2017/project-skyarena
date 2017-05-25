import React, {Component} from 'react'
import ChatPopUp from './ChatPopUp.jsx'
import * as actions from '../actions/index'
import  {bindActionCreators} from 'redux'
import {connect}  from 'react-redux'
import io from 'socket.io-client'

var socket = io();

class ChatIndex extends Component {
    constructor(props) {
        super(props);
        socket.on('create message', (data) => {
            if(this.props.state.chat.id === data.id){
                this.props.actions.newMessage(data)
            }
        })

    }

    componentDidMount() {
        this.props.user.friends.map(function (friend) {
            socket.emit("join", {
                id: friend.messageRoomId.toString()
            });
        })
    }

    render() {
        return (
            <div className="chat-index">
                {
                    this.props.user.friends.map(function (friend) {
                        if (friend.check) {

                            var link = "room-" + friend.messageRoomId.toString();
                            return (
                                <button className="btn btn-info" key={link} onClick={function (e) {
                                    this.props.actions.fetchChatRoom(friend.messageRoomId);
                                }.bind(this)}>
                                    Chat with {friend.to.name}
                                </button>
                            )
                        }
                    }.bind(this))
                }
                <ChatPopUp data={this.props.state.chat} socket={socket}/>
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
