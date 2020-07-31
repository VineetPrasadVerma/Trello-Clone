import React, { useContext, useState } from 'react'
import { Context as BoardContext } from '../../contexts/Board'
import { addBoard } from '../../services/Board'

const Board = ({ handleError }) => {
  const { boards, dispatch } = useContext(BoardContext)
  const [boardName, setBoardName] = useState('')

  const handleAddBoard = async (event) => {
    event.preventDefault()

    if (boardName) {
      try {
        const res = await addBoard(boardName)

        dispatch({
          type: 'ADD_BOARD',
          board: { newBoard: res.data[0] }
        })
        setBoardName('')
      } catch (err) {
        handleError("Can't add Board")
      }
    }
  }

  return (
    <div className='board'>
      {boards.map((board) => {
        return (
          <div className='boardItem' key={board.id}>
            <p>{board.name}</p>
          </div>
        )
      })}
      <div className='boardItem' style={{ backgroundColor: 'lightgreen' }}>
        <form onSubmit={handleAddBoard}>
          <input
            type='text'
            value={boardName}
            placeholder='Add New Board'
            onChange={(e) => setBoardName(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Board
