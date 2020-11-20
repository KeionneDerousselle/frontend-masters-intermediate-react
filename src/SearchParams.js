import React, { useState, useEffect, useContext } from 'react'
import petClient, { ANIMALS } from '@frontendmasters/pet'
import Results from './Results'
import useDropdown from './useDropdown'
import ThemeContext from './ThemeContext'

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA')
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])
  const [theme, setTheme] = useContext(ThemeContext)

  const requestPets = async () => {
    try {
      const { animals } = await petClient.animals({
        location,
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

export default SearchParams
