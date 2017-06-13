import React, { Component } from "react";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VideoThumbnail from "./VideoThumbnail.jsx";
import { FormControl } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.fetchVideo("", 0);
  }
  render() {
    if (!this.props.state.video) {
      return (
        <div>
          <div className="loader center" />
        </div>
      );
    } else {
      return (
        <div className="center">
          <FormControl
            type="text"
            placeholder="search ...."
            onKeyPress={e => {
              if (e.key === "Enter") {
                this.props.actions.fetchVideo(e.target.value, 0);
              }
            }}
          />
          <ul className="list-unstyled video-list-thumbs row">
            {this.props.state.video.lists.map((video, index) => {
              return <VideoThumbnail video={video} key={index} />;
            })}
          </ul>
          {this.props.state.video.waiting
            ? <div>
                <div className="loader center loader-more" />
              </div>
            : <div />}
          {this.props.state.video.count === this.props.state.video.lists.length
            ? <div>
                no more video
              </div>
            : <button
                onClick={() => {
                  this.props.actions.fetchMoreVideo(
                    this.props.state.video.page,
                    this.props.state.video.query
                  );
                }}
                className="btn btn-success"
              >
                load more video
              </button>}
        </div>
      );
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
