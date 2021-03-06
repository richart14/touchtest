import React, { Component } from 'react'
import './Thumbnail.css';

export class Thumbnail extends Component {
  render() {
    const { active, thumbnails, activeSwitch } = this.props;
    let thumbnailJSX = thumbnails.map((thumbnail,i) => (
      <li key={`thumbnail-${i}`}>
        <div className="thumb" onTouchMove={e => activeSwitch(e)}>
          <img src={thumbnail.gif} alt="gif" className="gif"/>
          <img src={thumbnail.image} alt="still" className={`still thumb-${i+1}`} style={{opacity: active === i+1 ? 0 : 1}}/>
        </div>
      </li>
      
    ))
    return (
      <div className="container">
        <ul>
          {thumbnailJSX}
        </ul>
      </div>
    )
  }
}

export default Thumbnail
