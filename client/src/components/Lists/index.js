import React, { useContext, useState } from 'react'

import { Context as ListContext } from '../../contexts/List'
import { addList } from '../../services/List'

const List = ({ handleError }) => {
  const { board, lists, dispatch } = useContext(ListContext)
  const [listName, setListName] = useState('')

  const handleAddList = async (event) => {
    event.preventDefault()

    if (listName) {
      try {
        const res = await addList(listName)

        dispatch({
          type: 'ADD_LIST',
          board: { newList: res.data[0] }
        })
        setListName('')
      } catch (err) {
        handleError("Can't add List")
      }
    }
  }

  return board ? (
    <div className='list'>
      {board.name}
      {lists.map((list) => {
        return (
          <div key={list.id} className='listItem'>
            <p>{list.name}</p>
          </div>
        )
      })}
      <div className='listItem'>
        <form onSubmit={handleAddList}>
          <input
            type='text'
            value={listName}
            placeholder='Add New List'
            onChange={(e) => setListName(e.target.value)}
          />
        </form>
      </div>
    </div>
  ) : (<></>)
}

export default List
