import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { Context as AuthContext } from '../../contexts/Auth'

const Navbar = () => {
  const { authUser, authDispatch } = useContext(AuthContext)
  const [isLogout, setIsLogout] = useState(false)

  const handleLogout = () => {
    document.cookie =
      'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    authDispatch({ type: 'LOGOUT_USER' })
    setIsLogout(true)
  }

  return isLogout ? (
    <Redirect to='/' />
  ) : (
    <nav>
      <Link to='/boards' style={{ float: 'left' }}>
        <p className='nav'>Boards</p>
      </Link>
      <Link to='/boards'>
        <span id='header' className='nav'>
          Trello
        </span>
      </Link>
      <p
        onClick={handleLogout}
        style={{ float: 'right' }}
        className='nav'
        id='logout'
      >
        Logout
      </p>
      <p style={{ float: 'right' }} className='nav'>
        Welcome {authUser.user.name}!
      </p>
    </nav>
  )
}

export default Navbar
