import React, {Component} from 'react'

class StatusIndex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.statuses === null)
            return(
                <div></div>
            );
        return (
            <div>
                {this.props.statuses.map((status, index)=>{
                    return(
                        <div key={index}>
                            {status.number} message(s) from {status.from.name}
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default StatusIndex;