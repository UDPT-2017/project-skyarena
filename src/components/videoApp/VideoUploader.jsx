import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon, ControlLabel, textarea } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

class VideoUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      video: null,
      message: ''
    }
  }
  onDrop(video, reject) {
    this.setState({ video: video[0] })
  }
  componentDidUpdate() {
    if (this.props.successReset) {
      this.setState({
        title: '',
        description: '',
        video: null
      })
      this.props.actions.successReset()
    }
  }
  render() {
    var message = null
    var alert = null
    var display = ''
    if (this.props.response && !this.props.waiting) {
      if (this.props.response.success) {
        alert = 'alert-uploaded'
        message = 'Upload success'
      } else {
        alert = 'alert-fail'
        message = this.props.response.message
      }
    }
    return (
      <div>
        {message
          ? <div className={alert} ref='popup'>
            <span className='closebtn' onClick={e => {
              this.refs.popup.className = 'disable'
            }}>&times</span>
            {message}
          </div>
          : <div />}
        <section>
          <form onSubmit={e => {
            e.preventDefault()
            this.props.actions.uploadVideo(
              this.state.title,
              this.state.description,
              this.state.video
            )
          }}>
            <ControlLabel>
              Title
            </ControlLabel>
            <FormControl
              type='text'
              placeholder='Title of the video'
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value })
              }} />
            <ControlLabel>
              Description
            </ControlLabel>
            <FormControl
              value={this.state.description}
              componentClass='textarea'
              placeholder='Description of the video'
              onChange={e => {
                this.setState({ description: e.target.value })
              }} />
            <Dropzone
              accept='video/mp4'
              className='dropzone'
              multiple={false}
              onDrop={this.onDrop.bind(this)}
              maxSize={41943040}>
              <p>
                Try dropping some files here, or click to select files to upload.(max size 40mb)
              </p>
            </Dropzone>
            <aside>
              <h3>Dropped files</h3>
              <ul>
                {this.state.video
                  ? <li>
                    {this.state.video.name} -
                       {this.state.video.size}bytes
                     </li>
                  : <div />}
              </ul>
            </aside>
            {!this.props.waiting
              ? <div>
                <input type='submit' className='form-control btn btn-success center' value='Submit' />
              </div>
              : <div className='block center'>
                <div className='video-loader '>
                </div>
                <div>
                  uploading ....
                   </div>
              </div>}
          </form>
        </section>
      </div>
    )
  }
}
export default VideoUploader
