import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Thumbnail from './components/Thumbnail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeThumb: 0,
      thumbnails: [
        {
          image: "https://www.usmagazine.com/wp-content/uploads/490599708_kermit-the-frog-zoom-a56d3bbe-0cb9-4242-b6f3-42ec25c50627.jpg?w=1024&h=588",
          gif: "http://i.imgur.com/aTMLvyA.jpg",
        },
        {
          image: "http://kidsncomicsblog.com/wp-content/uploads/2017/10/anna-300x187.jpg",
          gif: "https://66.media.tumblr.com/5e041735db47f25596057220473e802e/tumblr_inline_nua80evzuw1qafrh6_500.gif",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKFKKrcJD8otxL7t-AUAovDiOWxm-Gw3j44m1ZO4AkpA52ceu5",
          gif: "https://media.giphy.com/media/QlAlePWg77wKA/giphy.gif"
        },
      ]
    }

    this.handleActiveSwitch = this.handleActiveSwitch.bind(this);
  }
  
  handleActiveSwitch(e) {
    let classString = e.target.className;
    let index = parseInt(classString.slice(-1));
    this.setState({activeThumb: index})
    console.log('active switch', e.target.className)
  }

  render() {
    
    const { activeThumb, thumbnails } = this.state

    return (
      <div className="App">
        <Thumbnail thumbnails={thumbnails} activeSwitch={this.handleActiveSwitch} active={activeThumb}/>
      </div>
    );
  }
}

export default App;
