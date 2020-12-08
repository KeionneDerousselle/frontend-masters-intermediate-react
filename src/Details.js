import React, { Component } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import petClient from '@frontendmasters/pet'
import Modal from './Modal'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'

class Details extends Component {
  state = {
    loading: true,
    name: '',
    animal: '',
    location: '',
    description: '',
    media: '',
    breed: '',
    showModal: false
  }

  componentDidMount() {
    petClient
      .animal(this.props.id)
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  adopt = () => navigate(this.state.url)

  render() {
    const { animal, breed, description, name, location, media, loading, showModal } = this.state
    const { theme } = this.props

    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="details">
        <Carousel media={media}/>
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button
            style={{ backgroundColor: theme }}
            onClick={this.toggleModal}>
            Adopt {name}
          </button>
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

const mapStateToProps = ({ theme }) => ({ theme })

const WrappedDetails = connect(mapStateToProps)(Details)

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props}/>
    </ErrorBoundary>
  )
}
