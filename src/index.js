import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import  ReactPaginate from  'react-paginate';

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            type: "release",
            currentPage: 1,
            pages: 5,
            per_page: 25,
            data: [],
        };
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
            console.log(this.state.pages)


        }).catch(err => console.log(err))


    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const currentPage = selectedPage * this.state.per_page;


        this.setState({
            currentPage: selectedPage,

        }, () => {
            this.componentDidMount()
        }
        )
    }

    render() {

        return (
            <div>
                <header>
                    <h1>Discogs_api</h1>
                </header>

                {
                    this.state.data.map(
                        artist => (
                            <article>
                                <h3>{artist.title}</h3>
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
