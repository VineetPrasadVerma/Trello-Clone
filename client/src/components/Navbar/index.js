import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to='/boards' style={{ float: 'left' }}>
        <p className='nav'>Boards</p>
      </Link>
      <Link to='/boards'>
        <span id='header' className='nav'>
          Trello
        </span>
      </Link>
      <Link to='/boards' style={{ float: 'right' }}>
        <p className='nav'>Logout</p>
      </Link>
      <p style={{ float: 'right' }} className='nav'>
        Welcome Vineet!
      </p>
    </nav>
  )
}

export default Navbar
