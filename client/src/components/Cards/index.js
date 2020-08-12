import React, { useEffect, useContext, useState } from 'react'

import { Context as listContext } from '../../contexts/List'
import { addCard } from '../../services/List'
import CardItem from './CardItem'

import axios from 'axios'

const Card = ({ handleError, bid, lid }) => {
  const { lists, listsDispatch } = useContext(listContext)
  const [cardName, setCardName] = useState('')

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`/boards/${bid}/lists/${lid}/cards/`)
        listsDispatch({ type: 'SET_CARDS', listId: lid, cards: res.data })
      } catch (err) {
        handleError("Can't get Cards")
      }
    }

    fetchCards()
  }, [])

  const list = lists.find((list) => list.id === lid)

  const handleAddCard = async (event) => {
    event.preventDefault()

    if (cardName) {
      try {
        const res = await addCard(cardName, bid, lid)

        listsDispatch({
          type: 'ADD_CARD',
          card: { newCard: res.data[0] },
          list: { lid }
        })

        setCardName('')
      } catch (err) {
        handleError("Can't add Card")
      }
    }
  }

  return list.cards ? (
    <div className='cardContainer'>
      {list.cards.map((card) => {
        return (
          <CardItem key={card.id} card={card} />
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
