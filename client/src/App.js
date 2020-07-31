import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Board from './components/Boards'
import Navbar from './components/Navbar'
import { Provider as BoardProvider } from './contexts/Board'

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
        <BoardProvider>
          <Navbar />
          <Switch>
            <Route path='/boards'>
              <Board handleError={showError} />
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
