import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Context as BoardContext } from '../../contexts/Board'
import Navbar from '../../components/Navbar'
import { addBoard } from '../../services/Board'

const Board = ({ handleError }) => {
  const { authUser, boards, boardsDispatch } = useContext(BoardContext)
  const [boardName, setBoardName] = useState('')

  const handleAddBoard = async (event) => {
    event.preventDefault()

    if (boardName) {
      try {
        const res = await addBoard(boardName)

        boardsDispatch({
          type: 'ADD_BOARD',
          board: { newBoard: res.data[0] }
        })
        setBoardName('')
      } catch (err) {
        handleError("Can't add Board")
      }
    }
  }

  return !authUser.isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <>
      <Navbar />
      <div className='board'>
        {boards.map((board) => {
          return (
            <Link key={board.id} to={`/boards/${board.id}/lists`}>
              <div className='boardItem'>
                <p>{board.name}</p>
              </div>
            </Link>
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
    </>
  )
}

export default Board
