import React, { useState, useContext, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import axios from 'axios'

import { Context as AuthContext } from '../../contexts/Auth'

const Register = () => {
  const { authUser, authDispatch } = useContext(AuthContext)
  console.log(authUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const accessToken = authUser.accessToken
    if (accessToken) {
      setIsLoggedIn(true)
    }
  }, [])

  const registerUser = async (event) => {
    event.preventDefault()

    try {
      const res = await axios({
        method: 'POST',
        url: '/register',
        data: { username: name, email, password },
        headers: { 'Content-type': 'application/json' }
      })

      authDispatch({
        type: 'REGISTER_USER',
        accessToken: res.data.accessToken,
        user: res.data.user
      })

      console.log('After', authUser)
    } catch (e) {
      console.log('Registet', e)
    }
  }

  return authUser.isAuthenticated ? (
    <Redirect to='/boards' />
  ) : (
    <form onSubmit={registerUser}>
      <div className='login'>
        <h2>SignUp</h2>
        <div className='errorMessage'>{message}</div>

        <div className='emailContainer'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            title='Please enter valid email address'
          />
        </div>

        <div className='nameContainer'>
          <label>Username</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='passwordContainer'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            required
            pattern='.{6,}'
            title='6 characters minimum'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>SignUp</button>
        <p>
          Already have an account? <Link to='/'>Login here.</Link>
        </p>
      </div>
    </form>
  )
}

export default Register
