import React, {Component} from 'react'

class FriendButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var friend = this.props.friend;
        if (friend.friend && friend.accept) {
            return (
                <div>
                    <div className="col-sm-4 friend-block">
                        <button type="submit" className="btn btn-danger" style={{marginRight: 20 }} onClick={() => this.props.actions.removeFriend(friend.id, this.props.friendList.page, this.props.friendList.query) }>
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
                        <button type="submit" className="btn btn-info" style={{marginRight: 20 }} >
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
                        <button type="submit" className="btn btn-warning" style={{marginRight: 20 }} onClick={() => this.props.actions.acceptFriend(friend.id, this.props.friendList.page, this.props.friendList.query) }>
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
                        <button type="submit" className="btn btn-success" style={{marginRight: 20 }} onClick={() => this.props.actions.addFriend(friend.id, this.props.friendList.page, this.props.friendList.query) }>
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
