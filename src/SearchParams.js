import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import changeTheme  from './actionsCreators/changeTheme'
import changeLocation from './actionsCreators/changeLocation'
import petClient, { ANIMALS } from '@frontendmasters/pet'
import Results from './Results'
import useDropdown from './useDropdown'

const SearchParams = ({ location, setLocation, theme, setTheme }) => {
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])

  const requestPets = async () => {
    try {
      const { animals } = await petClient.animals({
        location: location,
        breed,
        type: animal
      })

      setPets(animals || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setBreeds([])
    setBreed('')

    petClient
      .breeds(animal)
      .then(({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name)
        setBreeds(breedStrings)
      })
      .catch(console.error)
  }, [animal, setBreed, setBreeds])

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault()
          requestPets()
        }}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />

        <BreedDropdown />

        <label htmlFor="theme">
          Theme
          <select
            name="theme"
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}>
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

const mapStateToProps = ({ theme, location }) => ({ theme, location })

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(changeTheme(theme)),
  setLocation: location => dispatch(changeLocation(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchParams)
