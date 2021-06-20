import React  from "react";


export default class Popup extends React.Component {


    render() {
        return (

            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.togglePopup}  >x</span>
                </div>
            </div>
        );
    };

}


