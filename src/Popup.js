import React, {Component} from "react";


export default class Popup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            release: [],
            tracks: [],
            images: []
        }
    }

    handleClick = () => this.props.toggle();

    componentDidMount(id) {
        const Discogs = require('disconnect').Client;

        let release;

        const db = new Discogs({

            consumerKey: 'HFtgfAjtghmkzzOluQKH',
            consumerSecret: 'ONVjfHqqlUKMQcIRpubJOVpOjYbbEVku'
        }).database();


        release = db.getRelease(this.props.children);
        release.then((result) => {
            this.setState({
                release: result,
                tracks: result.videos,
                images: result.images
            })
        }).catch(err => console.log(err));
    }

    render() {
        return (

            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.handleClick}>x</span>
                    <h1 className={"title"}>Title : {this.state.release.title} -
                        Artist: {this.state.release.artists_sort}</h1>
                    {this.state.images.map(img => (
                        <img className={"img-popup"} src={img.uri} alt={this.state.release.title}/>
                    ))

                    }
                    <div className="info">
                        <p>Price : <strong>{this.state.release.lowest_price}$</strong></p>
                        <p>Description : {this.state.release.notes}</p>
                        <p>Released : {this.state.release.released}</p>
                    </div>
                    <div className="tracks">
                        <h2>Tracks</h2>
                        <ul>
                            {
                                this.state.tracks.map(track => (
                                    <li> title : {track.title}
                                        <button target={"_blank"} href={track.uri}>YouTube</button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

}


