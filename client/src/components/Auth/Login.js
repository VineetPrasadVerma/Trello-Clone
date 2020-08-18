import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { Context as AuthContext } from '../../contexts/Auth'

import axios from 'axios'

const Login = () => {
  const { authUser, authDispatch } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([])

  const handleLoginUser = async (event) => {
    event.preventDefault()

    try {
      const res = await axios({
        method: 'POST',
        url: '/',
        data: { email, password },
        headers: { 'Content-type': 'application/json' }
      })

      if (res.status === 200) {
        authDispatch({
          type: 'REGISTER_USER',
          user: res.data.user
        })
      }
    } catch (e) {
      authDispatch({
        type: 'LOGOUT_USER'
      })
      setMessage(e.response.data.message)
    }
  }

  return authUser.isAuthenticated ? (
    <Redirect to='/boards' />
  ) : (
    <form onSubmit={handleLoginUser}>
      <div className='login'>
        <h2>Login</h2>
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

        <button type='submit'>Login</button>
        <p>
          Don't have an account.
          <Link className='registerLink' to='/register'>
            {' '}
            Register here.
          </Link>
        </p>
      </div>
    </form>
  )
}

export default Login
