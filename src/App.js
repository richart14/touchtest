import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleTouchMove(e) {
    console.log('moved', e)
  }
  render() {
    let style = { opacity: 0 }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div className="container">
            <img src="http://i.imgur.com/aTMLvyA.jpg" width="480" height="300" frameBorder="0" allowFullScreen className="gif" onTouchMove={e => this.handleTouchMove(e)} onTouchStart={e=>this.handleTouchMove(e)}></img>
            <img src="https://www.usmagazine.com/wp-content/uploads/490599708_kermit-the-frog-zoom-a56d3bbe-0cb9-4242-b6f3-42ec25c50627.jpg?w=1024&h=588" className="still" width="480" height="300" frameBorder="0"></img>
          </div>
          {/* <iframe src="https://66.media.tumblr.com/5e041735db47f25596057220473e802e/tumblr_inline_nua80evzuw1qafrh6_500.gif" width="480" height="300" frameBorder="0" allowFullScreen></iframe>
          <iframe src="http://www.reactiongifs.com/wp-content/uploads/2013/01/freezing-cold.gif" width="480" height="300" frameBorder="0" allowFullScreen></iframe> */}

        </header>
      </div>
    );
  }
}

export default App;
