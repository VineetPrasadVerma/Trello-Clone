import React from 'react'
import Board from './components/Boards'
import { Provider as BoardProvider } from './contexts/Board'

function App () {
  return (
    <div className='App'>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </div>
  )
}

export default App
