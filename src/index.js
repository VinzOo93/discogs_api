import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import  ReactPaginate from  'react-paginate';
import Popup from "./Popup";

export default class App extends React.Component {


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
        artists = db.search('', {type: this.state.type, page: this.state.currentPage , pages: this.state.pages, per_page: this.state.per_page});
        artists.then((result) => {
            this.setState({
               data: result.results,
            });
            console.log(this.state.data)


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

    togglePopup = (e) => {
        this.setState({
            seen: !this.state.seen
        });
        console.log(e)
    }

    render() {

        return (
            <div>
                <header>
                    <h1>Discogs_api</h1>
                    <h2>select a release</h2>
                </header>
                {this.state.seen ? <Popup toggle={this.togglePopup}/> : null}
                {
                    this.state.data.map(
                        release => (
                            <article key={release.id} onClick={this.togglePopup}>
                                <p>{release.title}</p>
                                <img src={release.thumb} alt={release.id}/>
                                <div className="description">
                                    <p>{release.country}</p>
                                    <p>{release.year}</p>
                                    <p>{release.genre}</p>
                                </div>
                            </article>)
                    )
                }
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
