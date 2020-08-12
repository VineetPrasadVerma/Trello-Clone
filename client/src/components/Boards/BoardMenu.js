import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { deleteBoard } from '../../services/Board'
import { Context as BoardContext } from '../../contexts/Board'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faUserAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

const BoardMenu = ({ setShowMenu, bid, handleError }) => {
  const { boardsDispatch } = useContext(BoardContext)
  const [redirectToBoard, setRedirectToBoard] = useState(false)

  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(bid)
      boardsDispatch({ type: 'DELETE_BOARD', board: { bid } })
      setRedirectToBoard(true)
    } catch (err) {
      handleError('Can\'t Delete Board')
    }
  }

  if (redirectToBoard) {
    return (
      <Redirect to='/boards' />
    )
  }
  return (
    <div className='boardMenu'>
      <div className='menuItems'>
        <div className='timesIcon'>
          <FontAwesomeIcon onClick={() => setShowMenu(false)} icon={faTimes} />
        </div>
        <hr />
        <div style={{ margin: '20px' }}>
          <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUserAlt} />
          Made by Vineet
        </div>
        <div
          onClick={handleDeleteBoard}
          style={{ padding: '20px', cursor: 'pointer' }}
        >
          <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faTrash} />
          Delete Board
        </div>
      </div>
    </div>
  )
}

export default BoardMenu
