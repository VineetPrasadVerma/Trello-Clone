import React, { useState } from 'react'

const CardEdit = ({ card, left, top, setShowEditIcon }) => {
  const [name, setName] = useState(card.name)

  const handleClick = (e) => {
    if (e.target.className === 'cardEdit') {
      setShowEditIcon(false)
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Edit Card Name'
          />
        </div>

        <div className='options'>
          <a className='deleteButton'>Delete</a>
        </div>

        <div className='saveButton'>
          <button className='saveButton'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CardEdit
