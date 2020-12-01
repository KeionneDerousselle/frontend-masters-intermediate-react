import React, { Component } from 'react'
import { Photo } from '@frontendmasters/pet'

interface IProps {
  media: Photo[]
}

interface IState {
  active: number
  photos: string[]
}

class Carousel extends Component<IProps, IState> {
  public state = {
    photos: [],
    active: 0
  }

  public static getDerivedStateFromProps({ media }: IProps) {
    return {
      photos:
        media && media.length
          ? media.map(({ large }) => large)
          : ['https://placecorgi.com/600/600']
    }
  }

  public handleImageClicked = (event: React.MouseEvent<HTMLElement>) => {
    if (
      !event ||
      !event.target ||
      !(event.target instanceof HTMLElement) ||
      !event.target.dataset ||
      !event.target.dataset.index
    ) return

    this.setState({
      active: +event.target.dataset.index
    })
  }

  public render() {
    const { photos, active } = this.state

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((p, index) => (
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
