import React, { useState } from 'react'
import Board from './components/Boards'
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
      <BoardProvider>
        <Board handleError={showError} />
      </BoardProvider>
    </div>
  ) : (
    <Error message={message} />
  )
}

export default App
