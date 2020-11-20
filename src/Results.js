import React from 'react'
import Pet from './Pet'

const Results = ({ pets }) => {
  return (
    <div className="search">
      {
        !pets || pets.length === 0 ?
          <h1>No pets found!</h1> :
          (
            pets.map(p => (
              <Pet
                key={p.id}
                id={p.id}
                animal={p.type}
                name={p.name}
                breed={p.breeds.primary}
                media={p.photos}
                location={`${p.contact.address.city}, ${p.contact.address.state}`} />
            ))
          )
      }
    </div>
  )
 }

export default Results