import React, {Component} from 'react'

class Profile extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.artist.length !== 0) {
            var artist = this.props.artist[0];
            return (
                <div className="profile">
                    <div>
                        <img
                            className="profile-img"
                            src={artist.images[0].url}
                            alt="Profile"
                        />
                    </div>
                    <div className="profile-name">
                        {artist.name}
                    </div>

                    <div className="profile-follower">
                        {artist.followers.total} followers
                    </div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, index) => {
                                genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre},` : ` ${genre}`;
                                return (
                                    <span key={index}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            );
        }
        return (
            <div >
            </div>
        );

    }
}
export default Profile;