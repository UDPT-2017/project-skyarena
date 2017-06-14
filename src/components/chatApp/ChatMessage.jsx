import React, { Component } from "react";
import TimeAgo from "react-timeago";

class ChatMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentUser)
      return (
        <div className="direct-chat-messages">
          <div className="direct-chat-msg ">
            <div className="direct-chat-info clearfix">
              <span className="direct-chat-name pull-left">
                {this.props.message.user.name}
              </span>
            </div>
            <img
              alt="message user image"
              src={this.props.message.user.avatar}
              className="direct-chat-img"
            />
            <div className="direct-chat-text">
              {this.props.message.text}
            </div>
            <div className="direct-chat-info clearfix">
              <span className="direct-chat-timestamp pull-right">
                <TimeAgo date={this.props.message.createdAt} />
              </span>
            </div>
          </div>
        </div>
      );
    return (
      <div className="direct-chat-messages">
        <div className="direct-chat-msg">
          <img
            alt="message user image"
            src={this.props.message.user.avatar}
            className="direct-chat-img-right right"
          />

          <div className="direct-chat-info-right right">
            <span className="direct-chat-name-right right">
              {this.props.message.user.name}
            </span>
          </div>

          <div className="direct-chat-text-left left">
            {this.props.message.text}
          </div>
          <div className="direct-chat-info pull-left">
            <span className="direct-chat-timestamp">
              <TimeAgo date={this.props.message.createdAt} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default ChatMessage;
