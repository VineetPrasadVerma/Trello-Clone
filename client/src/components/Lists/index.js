import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Context as ListContext } from '../../contexts/List'
import { Context as BoardContext } from '../../contexts/Board'
import { addList } from '../../services/List'

const List = ({ handleError }) => {
  const { boards, boardsDispatch } = useContext(BoardContext)
  const { lists, listsDispatch } = useContext(ListContext)

  const { bid } = useParams()

  const [listName, setListName] = useState('')
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    const board = boards.filter((board) => board.id === Number(bid))[0]
    if (board) setBoardName(board.name)
  }, [boards])

  const handleAddList = async (event) => {
    event.preventDefault()

    if (listName) {
      try {
        const res = await addList(listName)

        listsDispatch({
          type: 'ADD_LIST',
          board: { newList: res.data[0] }
        })
        setListName('')
      } catch (err) {
        handleError("Can't add List")
      }
    }
  }

  const updateList = (event) => {
    console.log(event)
  }

  return boardName ? (
    <div id='listContainer'>
      <form>
        <input
          className='editForm'
          type='text'
          value={boardName}
          placeholder='Edit Board'
          onChange={(e) => setBoardName(e.target.value)}
        />
      </form>
      <div className='list'>
        {lists.map((list) => {
          return (
            <div key={list.id} className='listItem'>
              <textarea
                className='listName'
                defaultValue={list.name}
                onBlur={(e) => {
                  return updateList(e.target.value)
                }}
              />
              <div style={{ backgroundColor: 'white' }}>Vineet</div>
              <div>Vineet</div>
              <div>Vineet</div>
              <div>Vineet</div>
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
  ) : (
    <></>
  )
}

export default List
