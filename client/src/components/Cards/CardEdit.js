import React, { useState, useContext } from 'react'

import { Context as listContext } from '../../contexts/List'
import { updateCard, deleteCard } from '../../services/Card'

const CardEdit = ({
  card,
  left,
  lid,
  bid,
  top,
  setShowEditIcon,
  handleError
}) => {
  const { listsDispatch } = useContext(listContext)

  const [cardName, setCardName] = useState(card.name)

  const handleClick = (e) => {
    if (e.target.className === 'cardEdit') {
      setShowEditIcon(false)
    }
  }

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(cardName, bid, lid, id)

      listsDispatch({
        type: 'DELETE_CARD',
        card: { cid: id },
        list: { lid }
      })

      setShowEditIcon(false)
    } catch (err) {
      handleError("Can't delete Card")
    }
  }

  const handleUpdateCard = async (id) => {
    if (cardName) {
      try {
        await updateCard(cardName, bid, lid, id)

        listsDispatch({
          type: 'UPDATE_CARDNAME',
          card: { cid: id, cardName },
          list: { lid }
        })

        setShowEditIcon(false)
      } catch (err) {
        handleError("Can't update Card")
      }
    }
  }

  return (
    <div className='cardEdit' onClick={(e) => handleClick(e)}>
      <div
        className='editContainer'
        style={{ marginLeft: `${left}px`, marginTop: `${top}px` }}
      >
        <div className='editCardInput'>
          <input
            value={cardName}
            autoFocus
            onChange={(e) => setCardName(e.target.value)}
            placeholder='Edit Card Name'
          />
        </div>

        <div className='options'>
          <a
            className='deleteButton'
            onClick={(e) => handleDeleteCard(card.id)}
          >
            Delete
          </a>
        </div>

        <div className='saveButton'>
          <button
            className='saveButton'
            onClick={(e) => handleUpdateCard(card.id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardEdit
