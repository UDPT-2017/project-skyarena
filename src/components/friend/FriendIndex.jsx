import React, {Component} from 'react'
import * as actions from '../../actions/index'
import  {bindActionCreators} from 'redux'
import {connect}  from'react-redux';
import FriendButton from './FriendButton.jsx';
import Pagination from "../Pagination.jsx";
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'

class FriendIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetchFriend(0, "");

    }

    render() {

        if (this.props.state.friendList && !this.props.state.friendList.waiting) {
            return (
                <div>
                    <FormControl
                        type="text"
                        placeholder="search for a friend"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                this.props.actions.fetchFriend(0, e.target.value);
                            }
                        }}
                    />
                    <div className="center">
                        <Pagination
                            totalItemsCount={this.props.state.friendList.count}
                            itemsCountPerPage={18}
                            activePage={this.props.state.friendList.page + 1}
                            pageRangeDisplayed={5}
                            onChange={(page) => {
                                this.props.actions.fetchFriend(page - 1, this.props.state.friendList.query);
                            }}
                        />
                    </div>

                    {
                        this.props.state.friendList.friends.map((friend, index) => {
                            return (
                                <div key={index}>
                                    <FriendButton friend={friend} actions={this.props.actions}
                                                  friendList={this.props.state.friendList}/>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        else {
            return (
                <div className="loader center">
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
