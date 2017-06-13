import React, { Component } from "react";
import TimeAgo from "react-timeago";

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentTime = jQuery.timeago(this.props.comment.createdAt);
    return (
      <div className="col-sm-12">
        <div className="panel panel-white post panel-shadow">
          <div className="post-heading">
            <div className="pull-left image">
              <img
                src={this.props.comment.user.avatar}
                className="img-circle avatar"
                alt="user profile image"
              />
            </div>
            <div className="pull-left meta">
              <div className="title h5">
                <a>
                  <b>
                    {this.props.comment.user.name}
                    {" "}
                  </b>
                </a>
                made a comment.
              </div>
              <h6 className="text-muted time">
                <TimeAgo date={this.props.comment.createdAt} />
              </h6>
            </div>
          </div>
          <div className="post-description">
            <p>
              {this.props.comment.text}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
