import React, { Component } from 'react';
import logo from './Octocat.png';
import './App.css';
import User from './components/User';
import Loader from './components/Loader';

let page = 0;

class App extends Component {

  state = {
    cards: [],
    loading: true
  };

  componentDidMount(){
    this.load();
  }

  load = (page) => {
    fetch('/api/' + page)
      .then(res => res.json())
      .then(res => this.setState({
        cards: res,
        loading: false
      }));
  };

  prevPage = (e) => {
    e.preventDefault();
    page = page > 0 ? page - 1 : 0;
    this.setState({ loading: true });
    this.load(page);
  };

  nextPage = (e) => {
    e.preventDefault();
    page = page + 1;
    this.setState({ loading: true });
    this.load(page);
  };

  render() {
    const cards = this.state.cards;

    if(this.state.loading){
      return <Loader/>;
    }

    return (
      <div className="App container-flex d-flex justify-content-center align-items-center">

        { cards.map((card, i) => (<User data={card} key={i}/>))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" href="#" onClick={this.prevPage}>Previous</a></li>
            <li className="page-item"><a className="page-link" href="#" onClick={this.nextPage}>Next</a></li>
          </ul>
        </nav>

      </div>
    );
  }
}

export default App;
