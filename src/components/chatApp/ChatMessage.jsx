import React, {Component} from 'react'

class ChatMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="direct-chat-messages">
                <div className="direct-chat-msg ">
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-name pull-left">{this.props.message.user.name}</span>
                    </div>
                    <img alt="message user image" src={this.props.message.user.avatar} className="direct-chat-img"/>
                    <div className="direct-chat-text">
                        {this.props.message.text}
                    </div>
                    <div className="direct-chat-info clearfix">
                        <span className="direct-chat-timestamp pull-right">{this.props.message.createdAt}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChatMessage;