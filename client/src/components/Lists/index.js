import React, { useContext, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBars } from '@fortawesome/free-solid-svg-icons'

import { Context as ListContext } from '../../contexts/List'
import { Context as BoardContext } from '../../contexts/Board'
import Navbar from '../../components/Navbar'
import Card from '../Cards'
import BoardMenu from '../Boards/BoardMenu'
import { updateBoardName } from '../../services/Board'
import { addList, updateListName, deleteList } from '../../services/List'

const List = ({ handleError }) => {
  const { boards, boardsDispatch } = useContext(BoardContext)
  const { authUser, lists, listsDispatch } = useContext(ListContext)

  const { bid } = useParams()

  const [listName, setListName] = useState('')
  const [boardName, setBoardName] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const board = boards.filter((board) => board.id === Number(bid))[0]
    if (board) setBoardName(board.name)
  }, [boards])

  const handleAddList = async (event) => {
    event.preventDefault()

    if (listName) {
      try {
        const res = await addList(bid, listName)

        listsDispatch({
          type: 'ADD_LIST',
          list: { newList: res.data[0] }
        })
        setListName('')
      } catch (err) {
        handleError("Can't add List")
      }
    }
  }

  const handleUpdateBoardName = async (boardName) => {
    if (boardName) {
      try {
        await updateBoardName(boardName, bid)

        boardsDispatch({ type: 'UPDATE_BOARD', board: { bid, boardName } })
      } catch (err) {
        handleError("Can't Update Board Name")
      }
    }
  }

  const handleUpdateList = async (listName, lid) => {
    if (listName !== '') {
      try {
        await updateListName(listName, bid, lid)

        listsDispatch({ type: 'UPDATE_LISTNAME', list: { lid, listName } })
      } catch (err) {
        handleError("Can't Update List Name")
      }
    }
  }

  const handleDeleteList = async (lid) => {
    try {
      await deleteList(bid, lid)

      listsDispatch({ type: 'DELETE_LIST', list: { lid } })
    } catch (err) {
      handleError("Can't Delete List")
    }
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return !authUser.isAuthenticated ? (
    <Redirect to='/' />
  ) : (boardName ? (
    <>
      <Navbar />

      <div id='listContainer'>
        {showMenu ? (
          <BoardMenu
            authUser={authUser}
            setShowMenu={setShowMenu}
            bid={bid}
            handleError={handleError}
          />
        ) : (
          ''
        )}

        <div style={{ display: 'flex' }}>
          <input
            className='editForm'
            type='text'
            defaultValue={boardName}
            placeholder='Edit Board Name'
            onBlur={(e) => handleUpdateBoardName(e.target.value)}
          />

          <div className='barsIcon'>
            <FontAwesomeIcon onClick={handleShowMenu} icon={faBars} />
          </div>
        </div>

        <div className='list'>
          {lists.map((list) => {
            return (
              <div key={list.id} className='listItem'>
                <div style={{ display: 'flex' }}>
                  <input
                    className='listName'
                    placeholder='Edit List Name'
                    defaultValue={list.name}
                    onBlur={(e) => {
                      handleUpdateList(e.target.value, list.id)
                    }}
                  />

                  <FontAwesomeIcon
                    onClick={() => handleDeleteList(list.id)}
                    style={{ margin: '15px', cursor: 'pointer' }}
                    icon={faTrash}
                  />
                </div>

                <Card handleError={handleError} bid={bid} lid={list.id} />
              </div>
            )
          })}
          <div>
            <form onSubmit={handleAddList}>
              <input
                className='addListForm'
                type='text'
                value={listName}
                placeholder='+ Add New List'
                onChange={(e) => setListName(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  ))
}

export default List
