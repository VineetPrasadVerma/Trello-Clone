import React, { useContext, useState } from 'react'
import { Context as BoardContext } from '../../contexts/Board'

const Board = () => {
  const { boards, dispatch } = useContext(BoardContext)
  return (
    <div className='board'>
      {boards.map((board) => {
        return <div key={board.id}>{board.name}</div>
      })}
    </div>
  )
}

export default Board
