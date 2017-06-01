import React, {Component} from 'react'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    playSong(url) {
        let audio = new Audio(url);
        if(!this.state.playing){
            audio.play();
            this.setState({
                playingUrl: url,
                audio,
                playing: true
            })
        }else{
            if(this.state.playingUrl === url){
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            }else {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            }
        }
    }

    render() {
        return (
            <div>

                {
                    this.props.song.map((song, i) => {
                        const songImages = song.album.images[0].url;
                        return (
                            <div key={i}
                                 className="track"
                                 onClick={()=>{this.playSong(song.preview_url)}}>
                                <img
                                    src={songImages}
                                    className="track-img"/>
                                <div className="track-play">
                                    <div className="track-play-inner">
                                        {
                                            this.state.playing?
                                                <span>
                                                    |  |
                                                </span>
                                                :
                                                <span>
                                                    &#9654;
                                                </span>
                                        }
                                    </div>
                                </div>
                                <p className="track-text">
                                    {song.name}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Gallery