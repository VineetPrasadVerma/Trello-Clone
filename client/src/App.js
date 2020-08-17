import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Board from './components/Boards'
import List from './components/Lists'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import { Provider as AuthProvider } from './contexts/Auth'
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
        <Switch>
          <AuthProvider>
            <Route exact path='/' component={Login} />

            <Route exact path='/register' component={Register} />

            <Route exact path='/boards'>
              <BoardProvider handleError={showError}>
                <Board handleError={showError} />
              </BoardProvider>
            </Route>

            <Route exact path='/boards/:bid/lists'>
              <BoardProvider handleError={showError}>
                <ListProvider handleError={showError}>
                  <List handleError={showError} />
                </ListProvider>
              </BoardProvider>
            </Route>

          </AuthProvider>
        </Switch>
      </Router>
    </div>
  ) : (
    <Error message={message} />
  )
}

export default App
