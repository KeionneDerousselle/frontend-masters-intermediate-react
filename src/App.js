import React, { useState, lazy, Suspense } from 'react'
import { render } from 'react-dom'
import SearchParams from './SearchParams'
import { Link, Router } from '@reach/router'
import ThemeContext from './ThemeContext'

// only code split components that are 30kb or larger. 
// extra code splitting only makes load times longer if you don't need to do it
const Details = lazy(() => import('./Details'))

const App = () => {
  const themeHook = useState('peru')

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Suspense
            fallback={<h1>Loading...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}

render(<App />, document.getElementById('root'))
