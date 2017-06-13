import React, { Component } from "react";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VideoUploader from "./VideoUploader.jsx";

class YourVideo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.state.your.upload
          ? <div>
              <h1
                className="center pointer"
                onClick={() => {
                  this.props.actions.closeUploader();
                }}
              >
                Upload new video
                <img
                  alt="Embedded Image"
                  src="data:image/png;base64,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"
                />
              </h1>
              <div>
                <VideoUploader
                  waiting={this.props.state.your.waiting}
                  actions={this.props.actions}
                  successReset={this.props.state.your.successReset}
                  response={this.props.state.your.response}
                />
              </div>

            </div>
          : <div>
              <h1
                className="center pointer"
                onClick={() => {
                  this.props.actions.openUploader();
                }}
              >
                Upload new video
                <img
                  alt="Embedded Image"
                  src="data:image/png;base64,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"
                />
              </h1>
            </div>}

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
export default connect(mapStateToProps, mapDispatchToProps)(YourVideo);
