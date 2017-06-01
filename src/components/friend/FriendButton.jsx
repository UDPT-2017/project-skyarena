import React, {Component} from 'react'

class FriendButton extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        var friend = this.props.friend;
        if (friend.friend && friend.accept) {
            return (
                <div>
                    <div className="col-sm-4 friend-block">
                        <button type="submit" className="btn btn-danger" style={{marginRight: 20 }}>
                            Remove
                        </button>
                        <img src={friend.avatar} className="small-avatar"/>
                        <label >
                            {friend.name}
                        </label>

                    </div>
                </div>
            )
        } else if (friend.friend && !friend.accept) {
            return (
                <div>
                    <div className="col-sm-4 friend-block">
                        <button type="submit" className="btn btn-info" style={{marginRight: 20 }}>
                            Requesting
                        </button>
                        <img src={friend.avatar} className="small-avatar"/>
                        <label >
                            {friend.name}
                        </label>

                    </div>
                </div>
            )
        } else if (!friend.friend && friend.accept) {
            return (
                <div>
                    <div className="col-sm-4 friend-block">
                        <button type="submit" className="btn btn-warning" style={{marginRight: 20 }}>
                            Accept request
                        </button>
                        <img src={friend.avatar} className="small-avatar"/>
                        <label >
                            {friend.name}
                        </label>

                    </div>
                </div>
            )
        } else  {
            return (
                <div>

                    <div className="col-sm-4 friend-block">
                        <button type="submit" className="btn btn-success" style={{marginRight: 20 }}>
                            Add
                        </button>
                        <img src={friend.avatar} className="small-avatar"/>
                        <label >
                            {friend.name}
                        </label>
                    </div>
                </div>
            )
        }
    }
}
export default FriendButton
