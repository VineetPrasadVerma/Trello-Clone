import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Board from './components/Boards'
import Navbar from './components/Navbar'
import List from './components/Lists'
import { Provider as BoardProvider } from './contexts/Board'
import { Provider as ListProvider } from './contexts/List'

import Error from './shared/Error'

function App () {
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const showError = (message) => {
    setMessage(message)
    setError(true)
  }

  return !error ? (
    <div className='App'>
      <Router>
        <BoardProvider handleError={showError}>
          <Navbar />
          <Switch>

            <Route path='/boards' exact>
              <Board handleError={showError} />
            </Route>

            <Route path='/boards/:bid/lists'>
              <ListProvider handleError={showError}>
                <List handleError={showError} />
              </ListProvider>
            </Route>

          </Switch>
        </BoardProvider>

      </Router>
    </div>
  ) : (
    <Error message={message} />
  )
}

export default App
