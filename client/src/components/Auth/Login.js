import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([])

  return isLoggedIn ? (
    <Redirect to='/boards' />
  ) : (
    <form>
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
          Don't have an account. <Link to='/register'>Register here</Link>
        </p>
      </div>
    </form>
  )
}

export default Login
