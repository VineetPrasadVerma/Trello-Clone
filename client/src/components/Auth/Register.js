import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'

import axios from 'axios'

import { Context as AuthContext } from '../../contexts/Auth'

const Register = () => {
  const { authUser, authDispatch } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegisterUser = async (event) => {
    event.preventDefault()

    try {
      const res = await axios({
        method: 'POST',
        url: '/register',
        data: { username: name, email, password },
        headers: { 'Content-type': 'application/json' }
      })

      if (res.status === 201) {
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
    <form onSubmit={handleRegisterUser}>
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
          Already have an account? <Link className='loginLink' to='/'>Login here.</Link>
        </p>
      </div>
    </form>
  )
}

export default Register
