import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import CardEdit from './CardEdit'

const CardItem = ({ card }) => {
  const [showEditIcon, setShowEditIcon] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const handleEditCardIcon = (e) => {
    setShowEditIcon(true)
    setX(e.pageX)
    setY(e.pageY)
  }

  return (
    <div className='cardItem' key={card.id}>
      {card.name}

      {showEditIcon ? (
        <CardEdit card={card} left={x} top={y} setShowEditIcon={setShowEditIcon} />
      ) : (
        <FontAwesomeIcon
          style={{ float: 'right', cursor: 'pointer' }}
          icon={faEdit}
          onClick={(e) => handleEditCardIcon(e)}
        />
      )}

    </div>
  )
}

export default CardItem
