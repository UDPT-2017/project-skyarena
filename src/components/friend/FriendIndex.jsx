import React, {Component} from 'react'
import * as actions from '../../actions/index'
import  {bindActionCreators} from 'redux'
import {connect}  from'react-redux';
import FriendButton from './FriendButton.jsx';

class FriendIndex extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.fetchFriend(2);
    }
    render(){
        if(this.props.state.friendList){
            return (
                <div>
                    {
                        this.props.state.friendList.friends.map(function (friend, index) {
                            return(
                                <div key={index}>
                                    <FriendButton friend={friend}/>
                                </div>
                            )
                        })
                    }

                </div>
            )
        }
        else{
            return (
                <div>

                </div>
            )
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendIndex);
