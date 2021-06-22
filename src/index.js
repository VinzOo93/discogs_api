import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactPaginate from 'react-paginate';
import Popup from "./Popup";
import App from "./App";
import app from "./Base";



export default class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            type: "release",
            currentPage: 0,
            pages: 10,
            per_page: 25,
            data: [],
            seen: false,
        };
        this.togglePopup = this.togglePopup.bind(this)

    }
    componentDidMount() {
        const Discogs = require('disconnect').Client;
        let releases;

        const db = new Discogs({

            consumerKey: 'HFtgfAjtghmkzzOluQKH',
            consumerSecret: 'ONVjfHqqlUKMQcIRpubJOVpOjYbbEVku'
        }).database();

        releases = db.search('', {type: this.state.type, page: this.state.currentPage , pages: this.state.pages, per_page: this.state.per_page});
        releases.then((result) => {
            this.setState({
               data: result.results,
            });


        }).catch(err => console.log(err))
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const currentPage = selectedPage * this.state.per_page;


        this.setState({
            currentPage: currentPage,


        }, () => {
            this.componentDidMount()
        }
        )
    }

    togglePopup : string = (e) => {
        this.setState({
            seen: !this.state.seen
        });
        if (this.state.seen === false) {
            let id = e.currentTarget.id
            this.setState({
                id: id
                })
        console.log(this.state.id)

        }
    }

    render() {

        return (
            <div>
                <header>
                    <div className="title">
                        <h1>Discogs_api</h1>
                        <a className={"sign-out"} onClick={() => app.auth().signOut()}>Sign out</a>
                    </div>
                </header>
                {this.state.seen ? <Popup children={this.state.id} toggle={this.togglePopup}/> : null}
                <div className="container-grid">
                    {
                        this.state.data.map(
                            release => (
                                <article>
                                    <h3>{release.title}</h3>
                                    <img className={"thumb"} src={release.thumb} alt={release.id}/>
                                    <div className="description">
                                        <button id={release.id} onClick={this.togglePopup}> show more</button>
                                        <p className={"info"}>{release.country}</p>
                                        <p className={"info"}>{release.year}</p>
                                        <p className={"info"}>{release.genre}</p>
                                    </div>
                                </article>)
                        )
                    }
                </div>

                <footer>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </footer>
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
