import React, { useEffect, useContext, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { Context as listContext } from '../../contexts/List'

import axios from 'axios'

const Card = ({ bid, lid }) => {
  const { lists, listsDispatch } = useContext(listContext)
  const [cardName, setCardName] = useState('')

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`/boards/${bid}/lists/${lid}/cards/`)
        listsDispatch({ type: 'SET_CARDS', listId: lid, cards: res.data })
      } catch (err) {
        // props.handleError("Can't get Lists")
      }
    }

    fetchCards()
  }, [])

  const list = lists.find((list) => list.id === lid)

  const handleAddCard = (event) => {
    console.log(event)
  }

  return list.cards ? (
    <div className='cardContainer'>
      {list.cards.map((card) => {
        return (
          <div className='cardItem' key={card.id}>
            {card.name}
            <FontAwesomeIcon
              style={{ float: 'right' }}
              icon={faEdit}
            />
          </div>
        )
      })}

      <form onSubmit={handleAddCard}>
        <input
          className='addCardForm'
          type='text'
          value={cardName}
          placeholder='+ Add New Card'
          onChange={(e) => setCardName(e.target.value)}
        />
      </form>

    </div>
  ) : (
    ''
  )
}

export default Card
