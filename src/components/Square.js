import React from 'react';

class Square extends React.Component {
    render() {
        return (
            <div>
                <button style={{height:100, width:100}}onClick={() => this.props.handleClick(this.props.sid)}> {this.props.value} </button>
            </div>
        )
    }
}

export default Square;