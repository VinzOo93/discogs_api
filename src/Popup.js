import React, {Component} from "react";


export default class Popup extends Component {
    handleClick = () => this.props.toggle();

    render() {
        return (

            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.handleClick}  >x</span>
                </div>
            </div>
        );
    };

}


