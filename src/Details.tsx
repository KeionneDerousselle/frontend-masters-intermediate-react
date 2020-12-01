import React, { Component } from 'react'
import petClient, { Photo } from '@frontendmasters/pet'
import { navigate, RouteComponentProps } from '@reach/router'
import Modal from './Modal'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import ThemeContext from './ThemeContext'

class Details extends Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    name: '',
    animal: '',
    location: '',
    description: '',
    media: [] as Photo[],
    breed: '',
    url: '',
    showModal: false
  }

  public componentDidMount() {
    if (!this.props.id) {
      navigate('/')
      return
    }

    petClient
      .animal(+this.props.id)
      .then(({ animal }) => {
        const {
          url,
          name,
          type,
          description,
          photos,
          breeds: { primary },
          contact: {
            address: { city, state }
          }
        } = animal

        this.setState({
          url,
          name,
          animal: type,
          location: `${city}, ${state}`,
          description,
          media: photos,
          breed: primary,
          loading: false
        })
      })
      .catch(console.error)
  }

  public toggleModal = () => this.setState({ showModal: !this.state.showModal })

  public adopt = () => navigate(this.state.url)

  public render() {
    const { animal, breed, description, name, location, media, loading, showModal } = this.state
    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="details">
        <Carousel media={media}/>
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
                <button
                  style={{ backgroundColor: theme }}
                  onClick={this.toggleModal}>
                  Adopt {name}
                </button>
            )}
          </ThemeContext.Consumer>
            <p>{description}</p>
            { showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name} ?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>
                      Yes
                    </button>
                    <button onClick={this.toggleModal}>
                      No
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
        </div>
      </div>
    )
  }
}

export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{ id: string }>
){
  return (
    <ErrorBoundary>
      <Details {...props}/>
    </ErrorBoundary>
  )
}
