import React, {Component} from "react";


export default class Popup extends Component {
    handleClick = () => this.props.toggle();

    render() {
        return (

            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.handleClick}  >x</span>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam architecto beatae corporis deleniti dicta dolor ea earum error esse eum excepturi expedita ipsam iusto nemo nobis obcaecati, pariatur quibusdam?</p>
                </div>
            </div>
        );
    };

}


