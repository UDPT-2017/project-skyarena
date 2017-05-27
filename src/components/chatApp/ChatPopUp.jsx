import React, {Component} from 'react'
import ChatMessage from './ChatMessage.jsx'
import $ from 'jquery';

class ChatPopUp extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        if (!(this.props.data === null)) {
            $("#messagesInsert").scrollTop($("#messagesInsert")[0].scrollHeight);
        }
    }
    componentDidUpdate(){
        if (!(this.props.data === null)) {
            $("#messagesInsert").scrollTop($("#messagesInsert")[0].scrollHeight);
        }
    }
    handlesubmit(e) {
        if (e.which == 13 && !e.shiftKey) {
            e.preventDefault();
            this.props.socket.emit("NEW_MESSAGE", {
                text: e.target.value,
                userId: this.props.data.session.id,
                name: this.props.data.session.name,
                avatar: this.props.data.session.avatar,
                id: this.props.data.id,
                friend: this.props.data.friend.id
            });
            e.target.value = "";
        }
    }

    render() {
        if (this.props.data === null) {
            return (
                <div></div>
            )
        } else {
            var data = this.props.data;
            return (
                <div className="popup-box chat-popup popup-box-on" id="qnimate">
                    <div className="popup-head">
                        <div className="popup-head-left pull-left"><img src={data.session.avatar}
                                                                        alt="iamgurdeeposahan"/>
                            {data.session.name}
                        </div>
                        <div className="popup-head-right pull-right">
                            <button id="removeClass" className="chat-header-button pull-right" type="button"><i
                                className="glyphicon glyphicon-off"></i></button>
                        </div>
                    </div>
                    <div className="popup-messages" id="messagesInsert">
                        {
                            data.messages.map((message, id) => {
                                return (
                                    <div key={id}>
                                        <ChatMessage message={message} key={id}/>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className="popup-messages-footer">
                    <textarea id="status_message"
                              placeholder="Type a message..."
                              rows="15"
                              cols="40"
                              onKeyPress={this.handlesubmit.bind(this)}
                              className="message"></textarea>
                    </div>
                </div>
            )
        }

    }
}
export default ChatPopUp;