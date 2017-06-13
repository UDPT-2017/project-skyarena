import React, { Component } from "react";

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      var thumb = this.props.video.url.substr(0, this.props.video.url.lastIndexOf(".")) + ".jpg";
    return (
      <li className="col-lg-3 col-sm-4 col-xs-6 thumbs-height">
        <a
          href={"/video/view/" + this.props.video.id}
          title={this.props.video.title}
        >
          <img
            src={thumb}
            alt="Barca"
            className="img-responsive"
            height="130px"
          />
          <h2>{this.props.video.title}</h2>
          <span className="glyphicon glyphicon-play-circle" />
        </a>
      </li>
    );
  }
}
export default VideoThumbnail;
