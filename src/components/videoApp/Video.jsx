import React, { Component } from "react";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DefaultPlayer as VideoPlayer } from "react-html5video";
import Comment from "./Comment.jsx";
import { FormControl } from "react-bootstrap";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }
  componentWillMount() {
    this.props.actions.getCurrentVideo(this.props.match.params.id);
    this.props.actions.getComments(this.props.match.params.id);
    this.props.actions.getCurrentVideoRating(this.props.match.params.id);
  }
  componentDidUpdate() {
    if (this.refs.like !== undefined && this.refs.dislike !== undefined) {
      if (this.props.state.current.like) {
        this.refs.like.classList = "like right active";
      } else {
        this.refs.like.classList = "like right";
      }
      if (this.props.state.current.dislike) {
        this.refs.dislike.classList = "dislike right active";
      } else {
        this.refs.dislike.classList = "like right";
      }
    }
  }

  render() {
    if (!this.props.state.current || !this.props.state.current.comments) {
      return (
        <div>
          <div className="loader center" />
        </div>
      );
    }
    if (!this.props.state.current.success) {
      return (
        <div className="alert-fail" ref="popup">
          <span
            className="closebtn"
            onClick={e => {
              this.refs.popup.className = "disable";
            }}
          >
            &times;
          </span>
          {this.props.state.current.message}
        </div>
      );
    }
    return (
      <div>
        <VideoPlayer
          autoPlay
          loop
          controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        >
          <source src={this.props.state.current.video.url} type="video/webm" />
        </VideoPlayer>
        <h2>{this.props.state.current.video.title}</h2>
        <div className="left uploader">
          By
          <img
            src={this.props.state.current.video.user.avatar}
            className="medium-avatar"
          />
          <label className="session-name">
            {this.props.state.current.video.user.name}
          </label>
        </div>
        <div
          className="dislike right"
          ref="dislike"
          onClick={() => {
            this.props.actions.dislike(this.props.match.params.id);
          }}
        >
          <i className="fa fa-thumbs-down" />
          <i className=" fa outer fa-circle-thin" />
          <p>{this.props.state.current.video.dislike}</p>
        </div>
        <div
          className="like right"
          ref="like"
          onClick={() => {
            this.props.actions.like(this.props.match.params.id);
          }}
        >
          <i className="fa fa-heart" />
          <i className=" fa outer fa-circle-thin" />
          <p>{this.props.state.current.video.like}</p>
        </div>
        <div className="description-text">
          <h4>{this.props.state.current.video.description}</h4>
        </div>
        <div>
          <div className="col-sm-12">
            <div className="panel panel-white post panel-shadow">
              <FormControl
                componentClass="textarea"
                placeholder="Add a comment"
                onChange={e => {
                  this.setState({ comment: e.target.value });
                }}
                value={this.state.comment}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.props.actions.addComment(
                      this.props.match.params.id,
                      this.state.comment
                    );
                    this.setState({comment: ""});
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {this.props.state.current.comments.map((comment, key) => {
              return <Comment key={key} comment={comment} />;
            })}
          </div>

        </div>
      </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Video);
