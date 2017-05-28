import React, {Component} from 'react'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'
import * as actions from '../../actions/index'
import  {bindActionCreators} from 'redux'
import {connect}  from'react-redux';
import Profile from './Profile.jsx'
import Gallery from './Gallery.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    render() {
        return (
            <div className="App">
                <div className="music-title">
                    Music box
                </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="search for an artist"
                            onChange={(e) => {
                                this.setState({query: e.target.value})
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    this.props.actions.queryArtist(this.state.query);
                                }
                            }}
                        />
                        <InputGroup.Addon
                            onClick={(e) => {
                                if (e.key === "Enter") {
                                    this.props.actions.queryArtist(this.state.query);
                                }
                            }}>
                            <Glyphicon glyph="search">
                            </Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Profile artist={this.props.state.artist}/>
                <Gallery song={this.props.state.song}/>
            </div>
        )
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
)(App);
