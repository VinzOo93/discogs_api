import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {

    state = {
        artists: []
    }


    componentDidMount() {
        const Discogs = require('disconnect').Client;
        let artists;

        const db = new Discogs({

            consumerKey: 'HFtgfAjtghmkzzOluQKH',
            consumerSecret: 'ONVjfHqqlUKMQcIRpubJOVpOjYbbEVku'
        }).database();
        /*        releases = db.getRelease(3)
                releases.then(
                    (result) => {
                        this.setState({releases: result});
                        console.log(result);
                    }
                )*/
        artists = db.search('', 'artist');
        artists.then((result) => {
            this.setState({
                artists: result.results,
            });
            console.log(this.state.artists)
        }).catch(err => console.log(err))


    }

    render() {

        return (
            <div>
                <header>
                    <h1>Discogs_api</h1>
                </header>

                {
                    this.state.artists.map(
                        artist => (
                            <article>
                                <h3>{artist.title}</h3>
                            </article>)
                    )
                }
            < /div>

        );

    }
}


const rootElement = document.getElementById("root")
ReactDOM.render(<App/>, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
