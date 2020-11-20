import React, { Component } from 'react'
class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  }

  static getDerivedStateFromProps({ media }) {
    return {
      photos:
        media && media.length
          ? media.map(({ large }) => large)
          : ['https://placecorgi.com/600/600']
    }
  }

  handleImageClicked = event => {
    this.setState({
      active: +event.target.dataset.index
    })
  }

  render() {
    const { photos, active } = this.state

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((p, index) => (
            // eslint-disable-next-line
            <img
              key={p}
              onClick={this.handleImageClicked}
              data-index={index}
              src={p}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
